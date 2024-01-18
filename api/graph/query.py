from graphene import ObjectType, String, Int, Schema, Field, List, ID
from graph.schema import UserType, NotificationScopeType, NotificationType
from bson import ObjectId

class Query(ObjectType):

    get_users = List(UserType, address=String())

    async def resolve_get_users(self, info, address=None):
        filters = {"address": address} if address else None
        users = await info.context["db"].users.find(filters).to_list(length=None)
        return users

    get_notification_scopes = List(NotificationScopeType, user=String())

    async def resolve_get_notification_scopes(self, info, user):
        filters = {"user": ObjectId(user)} if user else None
        notification_scopes = await info.context["db"].notification_scopes.find(filters).to_list(length=None)
        return notification_scopes

    get_notifications = List(NotificationType, notification_scope=String(), skip=Int(), limit=Int(), sort=String(), order=Int())

    async def resolve_get_notifications(self, info, notification_scope=None, skip=0, limit=10, sort="_id", order=1):
        filters = {"notification_scope": ObjectId(notification_scope)} if notification_scope else None

        notifications = await info.context["db"].notifications.find(filters) \
            .sort(sort, -1 if order < 0 else 1) \
            .skip(skip) \
            .limit(limit) \
            .to_list(length=None)

        return notifications