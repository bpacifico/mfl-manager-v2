from graphene import ObjectType, String, Int, Schema, Field, List, ID
from graph.schema import UserType, NotificationScopeType, NotificationType
from bson import ObjectId
from decorator.require_token import require_token


class Query(ObjectType):

    get_logged_user = Field(UserType)

    @require_token
    def resolve_get_logged_user(self, info):
        return info.context["user"]

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
