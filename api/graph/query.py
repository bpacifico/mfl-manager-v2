from graphene import ObjectType, String, Int, Schema, Field, List, ID, Boolean, Date
from graph.schema import UserType, PlayerType, CompetitionType, ClubType
from bson import ObjectId
from decorator.require_token import require_token
from decorator.add_token_if_exists import add_token_if_exists
from fastapi import HTTPException, status
from pymongo import MongoClient


class Query(ObjectType):
    """
        get_logged_user = Field(UserType)

        @require_token
        def resolve_get_logged_user(self, info):
            return info.context["user"]
    """
    get_players = List(PlayerType,
        search=String(),
        owners=List(String),
        min_ovr=Int(), max_ovr=Int(),
        min_age=Int(), max_age=Int(),
        min_height=Int(), max_height=Int(),
        min_pace=Int(), max_pace=Int(),
        min_dribbling=Int(), max_dribbling=Int(),
        min_passing=Int(), max_passing=Int(),
        min_shooting=Int(), max_shooting=Int(),
        min_defense=Int(), max_defense=Int(),
        min_physical=Int(), max_physical=Int(),
        nationalities=List(String),
        positions=List(String),
        first_position_only=Boolean(),
        preferred_foot=List(String),
        ignore_players_in_teams=Boolean(),
        skip=Int(), limit=Int(),
        sort=String(), order=Int()
        )

    @add_token_if_exists
    async def resolve_get_players(self, info,
        search=None,
        owners=None,
        min_ovr=1, max_ovr=100,
        min_age=1, max_age=100,
        min_height=1, max_height=300,
        min_pace=1, max_pace=100,
        min_dribbling=1, max_dribbling=100,
        min_passing=1, max_passing=100,
        min_shooting=1, max_shooting=100,
        min_defense=1, max_defense=100,
        min_physical=1, max_physical=100,
        nationalities=None,
        positions=None,
        first_position_only=False,
        preferred_foot=None,
        ignore_players_in_teams=False,
        skip=0, limit=50000,
        sort="overall", order=-1):

        filters = {}

        if min_ovr != 1 or max_ovr != 100:
            filters["overall"] = {"$gte": min_ovr, "$lte": max_ovr}
        if min_age != 1 or max_age != 100:
            filters["age"] = {"$gte": min_age, "$lte": max_age}
        if min_height != 1 or max_height != 300:
            filters["height"] = {"$gte": min_height, "$lte": max_height}
        if min_pace != 1 or max_pace != 100:
            filters["pace"] = {"$gte": min_pace, "$lte": max_pace}
        if min_dribbling != 1 or max_dribbling != 100:
            filters["dribbling"] = {"$gte": min_dribbling, "$lte": max_dribbling}
        if min_passing != 1 or max_passing != 100:
            filters["passing"] = {"$gte": min_passing, "$lte": max_passing}
        if min_shooting != 1 or max_shooting != 100:
            filters["shooting"] = {"$gte": min_shooting, "$lte": max_shooting}
        if min_defense != 1 or max_defense != 100:
            filters["defense"] = {"$gte": min_defense, "$lte": max_defense}
        if min_physical != 1 or max_physical != 100:
            filters["physical"] = {"$gte": min_physical, "$lte": max_physical}
        if nationalities is not None and len(nationalities) > 0:
            filters["nationalities"] = {"$in": nationalities}
        if positions is not None and len(positions) > 0:
            if first_position_only:
                filters["positions.0"] = {"$in": positions}
            else:
                filters["positions"] = {"$in": positions}
        if preferred_foot is not None and len(preferred_foot) > 0:
            filters["preferred_foot"] = {"$in": preferred_foot}
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

        if ignore_players_in_teams:
            if "user" in info.context and "_id" in info.context["user"]:
                user_team_ids = await info.context["db"].teams.find({"user": ObjectId(info.context["user"]["_id"])}).distinct("_id")
                player_ids = await info.context["db"].team_members.find({"team": {"$in": user_team_ids}}).distinct("player")

                if len(player_ids) > 0:
                    filters["_id"] = {"$nin": player_ids}
            else:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="User not found. Impossible to use 'ignore_players_in_teams'",
                )

        players = await info.context["db"].players \
            .find(filters) \
            .sort(sort, -1 if order < 0 else 1) \
            .skip(skip) \
            .limit(limit) \
            .to_list(length=None)

        return players

    competitions = List(
    CompetitionType,
    status=String(),
    type=String(),
    search=String(),
    skip=Int(),
    limit=Int(),
    sort=String(),
    order=Int()
    )


    @add_token_if_exists
    async def resolve_competitions(self, info, status=None, type=None, search=None, skip=0, limit=500, sort="_id", order=1):
        db = info.context["db"]
        competitions_collection = db.competitions

        filters = {}
        if status:
            filters["status"] = status
        if type:
            filters["type"] = type

        # Récupère toutes les compétitions correspondant aux filtres
        competitions = await competitions_collection.find(filters).to_list(length=None)

        def extract_parts(name):
            """ Extrait la division et le numéro à partir du nom de la compétition """
            parts = name.lower().split()
            if not parts:
                return "", ""
            division = parts[0]
            number = ""
            for part in reversed(parts):
                if part.isdigit():
                    number = part
                    break
            return division, number

        def relevance(comp):
            """ Calcule la pertinence d'une compétition par rapport à la recherche """
            if not search or len(search.strip()) < 2:
                return 3  # Score par défaut si la recherche est vide ou trop courte

            search_words = search.lower().split()

            search_div, search_num = search_words[0], search_words[-1]
            comp_div, comp_num = extract_parts(comp["name"])

            # Si la compétition correspond exactement à la recherche
            if f"{search_div} {search_num}" == f"{comp_div} {comp_num}":
                return 0  # Score très bas pour correspondance exacte

            # Si la compétition commence par la recherche (ex: "stone 1", "stone league 1")
            if comp_div == search_div and comp_num.startswith(search_num):
                return 1  # Moins pertinent, mais toujours lié à la recherche

            # Si le nom de la compétition contient la recherche
            if comp_div == search_div:
                return 2  # Plus éloigné, mais encore pertinent

            return 3  # Pas pertinent

        # Trie les compétitions par pertinence
        sorted_comps = sorted(competitions, key=lambda comp: relevance(comp))

        # Retourne les compétitions avec pagination
        return sorted_comps[skip: skip + limit]



    competition = Field(CompetitionType, id=Int(required=True))

    @add_token_if_exists
    async def resolve_competition(self, info, id):  
        db = info.context["db"]
        result = await db.competitions.find_one({"_id": id})
        return result


    get_clubs = List(ClubType, division=Int(), search=String(), owners=List(String), skip=Int(), limit=Int(), sort=String(), order=Int())

    async def resolve_get_clubs(self, info, division=None, search=None, owners=None, skip=0, limit=500, sort="_id", order=1):

        clubs = info.context["db"].clubs

        filters = {}
        if division:
            filters["division"] = division

        if owners is not None:
            filters["owner"] = {"$in": [ObjectId(o) for o in owners]}

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

            filters = {
                "$and": [
                    filters,
                    regex_query
                ]
            }

        clubs = await clubs \
            .find(filters) \
            .sort(sort, -1 if order < 0 else 1) \
            .skip(skip) \
            .limit(limit) \
            .to_list(length=None)

        return clubs


    competitions_by_club = List(CompetitionType, club_id=Int(required=True),type=String(), status=String())

    async def resolve_competitions_by_club(parent, info, club_id, type = None, status = None):
        filters = {
        "participants._id": club_id
    }
        if status:
            filters["status"] = status
        if type:
            filters["type"] = type

        db = info.context["db"]
        # On cherche les compétitions où l'un des participants a cet _id
        competitions = await db.competitions.find(filters).to_list(None)
        return competitions


schema = Schema(query=Query)