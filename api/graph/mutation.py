from graphene import Mutation, ObjectType, String, Int, Field, ID
from graph.schema import UserType, NotificationScopeType, NotificationType, NotificationScopeTypeEnum
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


class AddUser(Mutation):
    class Arguments:
        address = String(required=True)

    user = Field(lambda: UserType)

    async def mutate(self, info, address):
        cursor = info.context["db"].users.find({"address": {"$eq": address}})
        users = await cursor.to_list(length=1)

        if len(users) > 0:
            return build_error(502)

        info.context["db"].users.insert_one({"address": address})
        user = UserType({"address": address})
        return AddUser(user=user)


class UpdateUser(Mutation):
    class Arguments:
        address = String(required=True)
        email = String(required=True)

    user = Field(lambda: UserType)

    async def mutate(self, info, address, email):
        user = await info.context["db"].users.find_one({"address": {"$eq": address}})

        if user:
            user["email"] = email.lower() if email != "null" else None
            user["confirmation_code"] = secrets.token_hex(32) if user["email"] is not None else None
            user["is_email_confirmed"] = False

            info.context["db"].users.update_one({"address": address}, {"$set": user})

            if user["email"] is not None:
                await send_confirmation_mail(info.context["mail"], user["email"], user["confirmation_code"])

            return UpdateUser(user=user)

        return UpdateUser(user=None)


class SendConfirmationEmail(Mutation):
    class Arguments:
        address = String(required=True)
        email = String(required=True)

    user = Field(lambda: UserType)

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
        type = String(required=True) # Enum.from_enum(NotificationScopeTypeEnum)(required=True)
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

    async def mutate(self, info, **kwargs):
        user = await info.context["db"].users.find_one({"address": kwargs["user"]})

        if user:
            notification_scope = kwargs
            notification_scope["status"] = "active"
            notification_scope["user"] = user["_id"]
            notification_scope["creation_date"] = datetime.datetime.now()

            user = info.context["db"].notification_scopes.insert_one(notification_scope)
            return AddNotificationScope(notification_scope=notification_scope)
        else:
            raise Exception("User not found")


class AddNotification(Mutation):
    class Arguments:
        notification_scope_id = ID(required=True)

    notification = Field(lambda: NotificationType)

    async def mutate(self, info, notification_scope_id, **kwargs):
        scope = await info.context["db"].notification_scopes.find_one({"_id": ObjectId(notification_scope_id)})
        print(scope)

        if scope:
            notification = kwargs
            notification["notification_scope"] = scope["_id"]

            notification = await info.context["db"].notifications.insert_one(notification)
            return AddNotification(notification=notification)
        else:
            raise Exception("Notification scope not found")


class Mutation(ObjectType):
    add_user = AddUser.Field()
    update_user = UpdateUser.Field()
    add_notification_scope = AddNotificationScope.Field()
    add_notification = AddNotification.Field()
    send_confirmation_mail = SendConfirmationEmail.Field()
