from bson import ObjectId
from pymongo import ReturnDocument
import datetime
from utils.date import convert_unix_to_datetime


async def upsert_vars(db, var, value):
    var_record = await db.vars.find_one({"var": var})

    if var_record:
        filters = {"_id": var_record["_id"]}
        update_data = {
            "value": value,
        }

        await db.vars.update_one(filters, {"$set": update_data})
    else:
        await db.vars.insert_one({
            "var": var,
            "value": value
        })


async def get_var_value(db, var):
    record = await db.vars.find_one({"var": var})
    return record["value"] if record else None


async def upsert_user(db, user):
    if "address" in user:
        return await db.users.find_one_and_update(
        	{"address": user["address"]},
        	{"$set": user},
        	upsert=True,
        	return_document=ReturnDocument.AFTER
        )
    return None

async def upsert_player(db, player):
    return await db.players.find_one_and_update(
        {"_id": player["_id"]},
        {"$set": player},
        upsert=True,
        return_document=ReturnDocument.AFTER
    )


async def build_and_upsert_user(db, mfl_user):
    if "walletAddress" not in mfl_user or mfl_user["walletAddress"] is None:
        return None

    user = {}

    if "walletAddress" in mfl_user:
        user["address"] = mfl_user["walletAddress"]
    if "name" in mfl_user:
        user["name"] = mfl_user["name"]

    return await upsert_user(db, user)


async def build_and_upsert_player(db, mfl_player, owner=None):
    if "id" not in mfl_player or mfl_player["id"] is None:
        return None

    player = {
        "_id": mfl_player["id"]
    }

    if "metadata" in mfl_player:
        if "firstName" in mfl_player["metadata"]:
            player["first_name"] = mfl_player["metadata"]["firstName"]
        if "lastName" in mfl_player["metadata"]:
            player["last_name"] = mfl_player["metadata"]["lastName"]

        if "overall" in mfl_player["metadata"]:
            player["overall"] = mfl_player["metadata"]["overall"]
        if "nationalities" in mfl_player["metadata"]:
            player["nationalities"] = mfl_player["metadata"]["nationalities"]
        if "positions" in mfl_player["metadata"]:
            player["positions"] = mfl_player["metadata"]["positions"]
        if "height" in mfl_player["metadata"]:
            player["height"] = mfl_player["metadata"]["height"]
        if "preferredFoot" in mfl_player["metadata"]:
            player["preferred_foot"] = mfl_player["metadata"]["preferredFoot"]
        if "age" in mfl_player["metadata"]:
            player["age"] = mfl_player["metadata"]["age"]

        if "pace" in mfl_player["metadata"]:
            player["pace"] = mfl_player["metadata"]["pace"]
        if "shooting" in mfl_player["metadata"]:
            player["shooting"] = mfl_player["metadata"]["shooting"]
        if "passing" in mfl_player["metadata"]:
            player["passing"] = mfl_player["metadata"]["passing"]
        if "dribbling" in mfl_player["metadata"]:
            player["dribbling"] = mfl_player["metadata"]["dribbling"]
        if "defense" in mfl_player["metadata"]:
            player["defense"] = mfl_player["metadata"]["defense"]
        if "physical" in mfl_player["metadata"]:
            player["physical"] = mfl_player["metadata"]["physical"]
        if "goalkeeping" in mfl_player["metadata"]:
            player["goalkeeping"] = mfl_player["metadata"]["goalkeeping"]
        if "resistance" in mfl_player["metadata"]:
            player["resistance"] = mfl_player["metadata"]["resistance"]

    if owner and "_id" in owner:
        player["owner"] = owner["_id"]

    return await upsert_player(db, player)
