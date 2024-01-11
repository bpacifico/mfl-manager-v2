from graphene import ObjectType, String, Int, Schema, Field, List
from graph.schema import UserType, NotificationScopeType, NotificationType

class Query(ObjectType):

    get_users = List(UserType, address=String())

    async def resolve_get_users(self, info, address=None):
        filters = {"address": address} if address else None
        users = await info.context["db"].users.find(filters).to_list(length=None)
        return users

    get_notification_scopes = List(NotificationScopeType)

    async def resolve_get_notification_scopes(self, info):
        notification_scopes = await info.context["db"].notification_scopes.find().to_list(length=None)
        return notification_scopes

    get_notifications = List(NotificationType)

    async def resolve_get_notifications(self, info):
        notifications = await info.context["db"].notifications.find().to_list(length=None)
        return notifications