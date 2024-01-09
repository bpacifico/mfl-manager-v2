from graphene import ObjectType, String, Int, Schema, Field, List
from graph.schema import UserType, NotificationScopeType, NotificationType

class Query(ObjectType):

    db = None

    def __init__(self, db):
        self.db = db

    get_users = List(UserType)

    async def resolve_get_users(self, info):
        users = await self.db.users.find().to_list(length=None)
        return users

    get_notification_scopes = List(NotificationScopeType)

    async def resolve_get_notification_scopes(self, info):
        notification_scopes = await self.db.notification_scopes.find().to_list(length=None)
        return notification_scopes