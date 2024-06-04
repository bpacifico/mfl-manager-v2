from bson import ObjectId
from pymongo import ReturnDocument


async def upsert_vars(db, var, value):
    var_record = await db.vars.find_one({"var": var})

    if var_record:
        filters = {"_id": ObjectId(var_record["_id"])}
        update_data = {
            "value": value,
        }

        await db.vars.update_one(filters, {"$set": update_data})
    else:
        await db.vars.insert_one({
            "var": var,
            "value": value
        })


async def insert_user_if_not_exists(db, address, name=None):
    return await db.users.find_one_and_update(
    	{"address": address} if name is None else {"address": address, "name": name},
    	{"$set": {"address": address}},
    	upsert=True,
    	return_document=ReturnDocument.AFTER
    )
