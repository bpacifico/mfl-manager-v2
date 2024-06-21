from graphene import ObjectType, String, Int, Schema, Field, List, ID, Boolean
from graph.schema import UserType, SaleType, NotificationScopeType, NotificationType, CountType, DataPointType, ClubType, TeamType, TeamMemberType, PlayerType
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

        notification_scope_ids = [s["_id"] for s in notification_scopes]

        notifications = await info.context["db"].notifications \
            .find({"notification_scope": { "$in": notification_scope_ids }}) \
            .sort(sort, -1 if order < 0 else 1) \
            .skip(skip) \
            .limit(limit) \
            .to_list(length=None)

        return notifications

    get_clubs = List(ClubType, search=String(), skip=Int(), limit=Int(), sort=String(), order=Int())

    async def resolve_get_clubs(self, info, search=None, skip=0, limit=10, sort="_id", order=1):

        clubs = info.context["db"].clubs

        if search:
            words = [] if search is None else [w for w in search.split(" ") if len(w) > 1]

            regex_query = {
                "$and": [
                    {
                        "$or": [
                            {"name": {"$regex": word, "$options": "i"}},
                            {"city": {"$regex": word, "$options": "i"}},
                            {"country": {"$regex": word, "$options": "i"}}
                        ]
                    }
                    for word in words
                ]
            }

            clubs = clubs.find(regex_query)

        clubs = await clubs \
            .sort(sort, -1 if order < 0 else 1) \
            .skip(skip) \
            .limit(limit) \
            .to_list(length=None)

        return clubs

    get_sales = List(SaleType, type=String(), skip=Int(), limit=Int(), sort=String(), order=Int())

    async def resolve_get_sales(self, info, type=None, skip=0, limit=10, sort="execution_date", order=-1):

        sales = info.context["db"].sales

        if type == "PLAYER":
            sales = sales.find({"player": {"$exists": True, "$ne": None}})
        elif type == "CLUB":
            sales = sales.find({"club": {"$exists": True, "$ne": None}})

        sales = await sales \
            .skip(skip) \
            .limit(limit) \
            .to_list(length=None)

        return sales

    get_club_count = Int(founded_only=Boolean())

    async def resolve_get_club_count(self, info, founded_only=True):
        query = [
            {
                "$lookup": {
                    "from": "users",
                    "localField": "owner",
                    "foreignField": "_id",
                    "as": "owner_info"
                }
            },
            {"$match": {"owner_info.address": {"$ne": "0xf45dfaa6233fae44"}}},
            {"$count": "count"}
        ]

        if founded_only:
            query.insert(0, {"$match": {"status": "FOUNDED"}})

        return [c["count"] async for c in info.context["db"].clubs.aggregate(query)][0]

    get_club_division_counts = List(CountType, founded_only=Boolean())

    async def resolve_get_club_division_counts(self, info, founded_only=True):
        query = [
            {
                "$lookup": {
                    "from": "users",
                    "localField": "owner",
                    "foreignField": "_id",
                    "as": "owner_info"
                }
            },
            {"$match": {"owner_info.address": {"$ne": "0xf45dfaa6233fae44"}}},
            {"$group": {"_id": "$division", "count": {"$sum": 1}}}
        ]

        if founded_only:
            query.insert(0, {"$match": {"status": "FOUNDED"}})

        cursor = info.context["db"].clubs.aggregate(query)

        return [CountType(key=c["_id"], count=c["count"]) async for c in cursor]

    get_club_owner_count = Int()

    async def resolve_get_club_owner_count(self, info):
        return len(await info.context["db"].clubs.distinct('owner')) - 1

    get_clubs_per_owner_counts = List(CountType, founded_only=Boolean())

    async def resolve_get_clubs_per_owner_counts(self, info, founded_only=True):
        query = [
            {
                "$lookup": {
                    "from": "users",
                    "localField": "owner",
                    "foreignField": "_id",
                    "as": "owner_info"
                }
            },
            {"$match": {"owner_info.address": {"$ne": "0xf45dfaa6233fae44"}}},
            {"$group": {"_id": "$owner", "count": {"$sum": 1}}},
            {"$group": {"_id": "$count", "count": {"$sum": 1}}}
        ]

        if founded_only:
            query.insert(0, {"$match": {"status": "FOUNDED"}})

        cursor = info.context["db"].clubs.aggregate(query)

        return [CountType(key=c["_id"], count=c["count"]) async for c in cursor]

    get_data_points = List(DataPointType, property=String())

    async def resolve_get_data_points(self, info, property):
        return await info.context["db"].data_points \
            .find({"property": property}) \
            .to_list(length=None)

    get_teams = List(TeamType)

    @require_token
    async def resolve_get_teams(self, info):
        return await info.context["db"].teams \
            .find({"user": info.context["user"]["_id"]}) \
            .to_list(length=None)

    get_team_members = List(TeamMemberType, team=String())

    @require_token
    async def resolve_get_team_members(self, info, team=None):
        team = await info.context["db"].teams.find_one({"_id": ObjectId(team)})

        if not team:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, # to change to 404
                detail="Team not found",
            )

        if info.context["user"]["_id"] != team["user"]:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="This user does not have access to this team",
            )

        team_members = await info.context["db"].team_members \
            .find({"team": ObjectId(team["_id"])}) \
            .to_list(length=None)

        return team_members

    get_players = List(PlayerType, search=String(), owners=List(String), min_ovr=Int(), max_ovr=Int(), nationalities=List(String), positions=List(String), skip=Int(), limit=Int(), sort=String(), order=Int())

    async def resolve_get_players(self, info, search=None, owners=None, min_ovr=1, max_ovr=100, nationalities=None, positions=None, skip=0, limit=10, sort="overall", order=-1):

        filters = {
            "overall": {"$gt": min_ovr, "$lt": max_ovr}
        }

        if nationalities is not None:
            filters["nationalities"] = {"$in": nationalities}
        if positions is not None:
            filters["positions"] = {"$in": positions}
        if owners is not None:
            filters["owner"] = {"$in": [ObjectId(o) for o in owners]}

        if search:
            words = [] if search is None else [w for w in search.split(" ") if len(w) > 1]

            regex_query = {
                "$and": [
                    {
                        "$or": [
                            {"first_name": {"$regex": word, "$options": "i"}},
                            {"last_name": {"$regex": word, "$options": "i"}},
                        ]
                    }
                    for word in words
                ]
            }

            filters = {
                "$and": [
                    filters,
                    regex_query
                ]
            }

        players = await info.context["db"].players \
            .find(filters) \
            .sort(sort, -1 if order < 0 else 1) \
            .skip(skip) \
            .limit(limit) \
            .to_list(length=None)

        return players

    get_player_nationalities = List(String)

    async def resolve_get_player_nationalities(self, info):

        pipeline = [
            { "$unwind": "$nationalities" },
            { "$group": { "_id": "$nationalities" } },
            { "$sort": { "_id": 1 } }
        ]

        result = info.context["db"].players.aggregate(pipeline)

        return [doc["_id"] async for doc in result]

    get_users = List(UserType, search=String(), skip=Int(), limit=Int(), sort=String(), order=Int())

    async def resolve_get_users(self, info, search=None, skip=0, limit=10, sort="_id", order=1):

        users = info.context["db"].users

        if search:
            words = [] if search is None else [w for w in search.split(" ") if len(w) > 1]

            regex_query = {
                "$and": [
                    {
                        "$or": [
                            {"address": {"$regex": word, "$options": "i"}},
                            {"name": {"$regex": word, "$options": "i"}},
                        ]
                    }
                    for word in words
                ]
            }

            users = users.find(regex_query)

        users = await users \
            .sort(sort, -1 if order < 0 else 1) \
            .skip(skip) \
            .limit(limit) \
            .to_list(length=None)

        return users