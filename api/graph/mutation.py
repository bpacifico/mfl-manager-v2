from graphene import Mutation, ObjectType, String, Int, Field, ID, Boolean, List
from decorator.require_token import require_token
from graph.schema import UserType
import datetime
import secrets
from bson import ObjectId
from mail.mail_manager import send_confirmation_mail
import copy


class UpdateLoggedUserEmail(Mutation):
    class Arguments:
        email = String(required=True)

    user = Field(lambda: UserType)

    @require_token
    async def mutate(self, info, email):
        user = copy.deepcopy(info.context["user"])

        user["email"] = email.lower() if email != "null" else None
        user["confirmation_code"] = secrets.token_hex(32) if user["email"] is not None else None
        user["is_email_confirmed"] = False

        info.context["db"].users.update_one({"address": user["address"]}, {"$set": user})

        if user["email"] is not None:
            await send_confirmation_mail(info.context["mail"], user["email"], user["confirmation_code"])

        return UpdateLoggedUserEmail(user=user)



class SendConfirmationEmail(Mutation):
    class Arguments:
        address = String(required=True)
        email = String(required=True)

    user = Field(lambda: UserType)

    @require_token
    async def mutate(self, info, address, email):
        user = await info.context["db"].users.find_one({"address": {"$eq": address}})

        if user and user["email"] is not None:
            user["confirmation_code"] = secrets.token_hex(32) if email != "null" else None

            info.context["db"].users.update_one({"address": address}, {"$set": user})
            await send_confirmation_mail(info.context["mail"], user["email"], user["confirmation_code"])

            return SendConfirmationEmail(user=user)

        return SendConfirmationEmail(user=None)


class Mutation(ObjectType):
    update_logged_user_email = UpdateLoggedUserEmail.Field()
    send_confirmation_mail = SendConfirmationEmail.Field()
