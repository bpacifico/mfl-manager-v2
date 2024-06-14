from bson import ObjectId
from pymongo import ReturnDocument
import datetime


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


async def upsert_user(db, address, name=None):
    return await db.users.find_one_and_update(
    	{"address": address} if name is None else {"address": address, "name": name},
    	{"$set": {"address": address}},
    	upsert=True,
    	return_document=ReturnDocument.AFTER
    )

async def upsert_player(db, player):
    return await db.players.find_one_and_update(
        {"_id": player["_id"]},
        {"$set": player},
        upsert=True,
        return_document=ReturnDocument.AFTER
    )

async def upsert_club(db, club):
    return await db.clubs.find_one_and_update(
        {"_id": club["_id"]},
        {"$set": club},
        upsert=True,
        return_document=ReturnDocument.AFTER
    )

async def upsert_sale(db, sale):
    return await db.sales.find_one_and_update(
        {"_id": sale["_id"]},
        {"$set": sale},
        upsert=True,
        return_document=ReturnDocument.AFTER
    )


async def build_and_upsert_player(db, mfl_player):
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

    return await upsert_player(db, player)


async def build_and_upsert_club(db, mfl_club, owner=None):
    if "id" not in mfl_club or mfl_club["id"] is None:
        return None

    club = {
        "_id": mfl_club["id"],
        "last_computation_date": datetime.datetime.now(),
    }

    if "status" in mfl_club:
        club["status"] = mfl_club["status"]
    if "name" in mfl_club:
        club["name"] = mfl_club["name"]
    if "division" in mfl_club:
        club["division"] = mfl_club["division"]
    if "city" in mfl_club:
        club["city"] = mfl_club["city"]
    if "country" in mfl_club:
        club["country"] = mfl_club["country"]
    if "foundationDate" in mfl_club:
        club["foundation_date"] = datetime.datetime.fromtimestamp(mfl_club["foundationDate"] / 1000) \
            if "foundationDate" in mfl_club else None
    if "country" in mfl_club:
        club["country"] = mfl_club["country"]

    if owner and "_id" in owner:
        club["owner"] = owner["_id"]

    return await upsert_club(db, club)


async def build_and_upsert_sale(db, mfl_sale, player=None, club=None):

    sale = {
        "_id": mfl_sale["id"],
        "price": mfl_sale["price"],
        "execution_date": datetime.datetime.fromtimestamp(mfl_sale["purchaseDateTime"] / 1000),
    }

    if player is not None:
        sale["player"] = player["_id"]

    if club is not None:
        sale["club"] = club["_id"]
    
    return await upsert_sale(db, sale)
