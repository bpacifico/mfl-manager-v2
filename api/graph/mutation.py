from graphene import Mutation, ObjectType, String, Int, Field, ID

from decorator.require_token import require_token
from graph.schema import UserType, NotificationScopeType, NotificationType
import datetime
import secrets
from bson import ObjectId
from mail.mail_manager import send_confirmation_mail


def build_error(code):
    return {
        "errors": [
            {
                "code": code,
                "message": "object of type 'AsyncIOMotorCursor' has no len()",
            } 
        ]
    }


class AddLoggedUser(Mutation):

    user = Field(lambda: UserType)

    @require_token
    async def mutate(self, info):
        cursor = info.context["db"].users.find({"address": {"$eq": info["user"]["address"]}})
        users = await cursor.to_list(length=1)

        if len(users) > 0:
            return build_error(502)

        info.context["db"].users.insert_one({"address": info["user"]["address"]})
        user = UserType({"address": info["user"]["address"]})
        return AddLoggedUser(user=user)


class UpdateLoggedUserEmail(Mutation):
    class Arguments:
        email = String(required=True)

    user = Field(lambda: UserType)

    @require_token
    async def mutate(self, info, email):
        user = await info.context["db"].users.find_one({"address": {"$eq": info["user"]["address"]}})

        if user:
            user["email"] = email.lower() if email != "null" else None
            user["confirmation_code"] = secrets.token_hex(32) if user["email"] is not None else None
            user["is_email_confirmed"] = False

            info.context["db"].users.update_one({"address": info["user"]["address"]}, {"$set": user})

            if user["email"] is not None:
                await send_confirmation_mail(info.context["mail"], user["email"], user["confirmation_code"])

            return UpdateLoggedUserEmail(user=user)

        return UpdateLoggedUserEmail(user=None)


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


class AddNotificationScope(Mutation):
    class Arguments:
        user = String(required=True)
        type = String(required=True)  # Enum.from_enum(NotificationScopeTypeEnum)(required=True)
        min_price = Int()
        max_price = Int()
        min_age = Int()
        max_age = Int()
        min_ovr = Int()
        max_ovr = Int()
        min_pac = Int()
        max_pac = Int()
        min_dri = Int()
        max_dri = Int()
        min_pas = Int()
        max_pas = Int()
        min_sho = Int()
        max_sho = Int()
        min_def = Int()
        max_def = Int()
        min_phy = Int()
        max_phy = Int()

    notification_scope = Field(lambda: NotificationScopeType)

    @require_token
    async def mutate(self, info, **kwargs):
        user = await info.context["db"].users.find_one({"address": kwargs["user"]})

        if user:
            notification_scope = kwargs
            notification_scope["status"] = "active"
            notification_scope["user"] = user["_id"]
            notification_scope["creation_date"] = datetime.datetime.now()

            notification_scope = info.context["db"].notification_scopes.insert_one(notification_scope)
            return AddNotificationScope(notification_scope=notification_scope)
        else:
            raise Exception("User not found")


class DeleteNotificationScope(Mutation):
    class Arguments:
        scope_id = String(required=True)

    notification_scope = Field(lambda: NotificationScopeType)

    @require_token
    async def mutate(self, info, scope_id):
        # user = await info.context["db"].users.find_one({"address": {"$eq": user_id}})

        # if user:
        notification_scope = info.context["db"].notification_scopes.find_one({
            "_id": ObjectId(scope_id)
        })

        if notification_scope:
            info.context["db"].notification_scopes.delete_one({'_id': ObjectId(scope_id)})
            return DeleteNotificationScope(notification_scope=notification_scope)
        else:
            raise Exception("Scope not found")
        # else:
        #    raise Exception("User not found")


class AddNotification(Mutation):
    class Arguments:
        notification_scope_id = ID(required=True)

    notification = Field(lambda: NotificationType)

    @require_token
    async def mutate(self, info, notification_scope_id, **kwargs):
        scope = await info.context["db"].notification_scopes.find_one({"_id": ObjectId(notification_scope_id)})

        if scope:
            notification = kwargs
            notification["notification_scope"] = scope["_id"]

            notification = await info.context["db"].notifications.insert_one(notification)
            return AddNotification(notification=notification)
        else:
            raise Exception("Notification scope not found")


class Mutation(ObjectType):
    add_logged_user = AddLoggedUser.Field()
    update_logged_user_email = UpdateLoggedUserEmail.Field()
    add_notification_scope = AddNotificationScope.Field()
    delete_notification_scope = DeleteNotificationScope.Field()
    add_notification = AddNotification.Field()
    send_confirmation_mail = SendConfirmationEmail.Field()
