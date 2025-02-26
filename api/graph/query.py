from graphene import ObjectType, String, Int, Schema, Field, List, ID, Boolean, Date
from graph.schema import UserType, PlayerType
from bson import ObjectId
from decorator.require_token import require_token
from fastapi import HTTPException, status


class Query(ObjectType):

    get_logged_user = Field(UserType)

    @require_token
    def resolve_get_logged_user(self, info):
        return info.context["user"]

    get_players = List(PlayerType, search=String(), owners=List(String), min_ovr=Int(), max_ovr=Int(), min_age=Int(), max_age=Int(), nationalities=List(String), positions=List(String), skip=Int(), limit=Int(), sort=String(), order=Int())

    async def resolve_get_players(self, info, search=None, owners=None, min_ovr=1, max_ovr=100, min_age=1, max_age=99, nationalities=None, positions=None, skip=0, limit=10, sort="overall", order=-1):

        filters = {
            "overall": {"$gte": min_ovr, "$lte": max_ovr},
            "age_at_mint": {"$gte": min_age, "$lte": max_age}
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
