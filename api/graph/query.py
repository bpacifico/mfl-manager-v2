from graphene import ObjectType, String, Int, Schema, Field, List, ID, Boolean
from graph.schema import UserType, NotificationScopeType, NotificationType, CountType
from bson import ObjectId
from decorator.require_token import require_token
from fastapi import HTTPException, status


class Query(ObjectType):

    get_logged_user = Field(UserType)

    @require_token
    def resolve_get_logged_user(self, info):
        return info.context["user"]

    get_notification_scopes = List(NotificationScopeType)

    @require_token
    async def resolve_get_notification_scopes(self, info):
        return await info.context["db"].notification_scopes \
            .find({"user": info.context["user"]["_id"]}) \
            .to_list(length=None)

    get_notifications = List(NotificationType, notification_scope=String(), skip=Int(), limit=Int(), sort=String(), order=Int())

    @require_token
    async def resolve_get_notifications(self, info, notification_scope=None, skip=0, limit=10, sort="_id", order=1):

        if notification_scope:
            notification_scope = await info.context["db"].notification_scopes \
                .find_one({"_id": ObjectId(notification_scope)})

            if not notification_scope:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED, # to change to 404
                    detail="Notification scope not found",
                )

            if info.context["user"]["_id"] != notification_scope["user"]:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="This user does not have access to this notification scope",
                )

            notification_scopes = [notification_scope]

        else:
            notification_scopes = await info.context["db"].notification_scopes \
                .find({"user": info.context["user"]["_id"]}) \
                .to_list(length=None)

        notification_scope_ids = [s["_id"] for s in  notification_scopes]

        notifications = await info.context["db"].notifications \
            .find({"notification_scope": { "$in": notification_scope_ids }}) \
            .sort(sort, -1 if order < 0 else 1) \
            .skip(skip) \
            .limit(limit) \
            .to_list(length=None)

        return notifications

    get_club_count = Int(founded_only=Boolean())

    async def resolve_get_club_count(self, info, founded_only=True):
        return await info.context["db"].clubs \
            .count_documents({ "status": "FOUNDED" } if founded_only else {})

    get_club_division_counts = List(CountType, founded_only=Boolean())

    async def resolve_get_club_division_counts(self, info, founded_only=True):        
        if founded_only:
            cursor = info.context["db"].clubs.aggregate([
                {"$match": { "status": "FOUNDED" }},
                {"$group": {"_id": "$division", "count": {"$sum": 1}}}
            ])
        else:
            cursor = info.context["db"].clubs.aggregate([
                {"$group": {"_id": "$division", "count": {"$sum": 1}}}
            ])

        return [CountType(key=c["_id"], count=c["count"]) async for c in cursor]

    get_club_owner_count = Int()

    async def resolve_get_club_owner_count(self, info):
        return len(await info.context["db"].clubs.distinct('owner'))

    get_clubs_per_owner_counts = List(CountType, founded_only=Boolean())

    async def resolve_get_clubs_per_owner_counts(self, info, founded_only=True):
        if founded_only:
            cursor = info.context["db"].clubs.aggregate([
                {"$match": { "status": "FOUNDED" }},
                {"$group": {"_id": "$owner", "count": {"$sum": 1}}},
                {"$group": {"_id": "$count", "count": {"$sum": 1}}}
            ])
        else:
            cursor = info.context["db"].clubs.aggregate([
                {"$group": {"_id": "$owner", "count": {"$sum": 1}}},
                {"$group": {"_id": "$count", "count": {"$sum": 1}}}
            ])

        return [CountType(key=c["_id"], count=c["count"]) async for c in cursor]
