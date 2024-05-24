from bson import ObjectId
import datetime
import requests
import logging

base_url = "https://z519wdyajg.execute-api.us-east-1.amazonaws.com/prod/clubs/"
max_clubs_to_update = 3

last_treated_club_id_var = "last_treated_club_id"

logger = logging.getLogger("collect_clubs")
logger.setLevel(logging.INFO)


async def main(db):

    last_id = await _get_last_treated_club_id(db)

    club_ids_to_fetch = [x for x in range(last_id + 1, last_id + 1 + max_clubs_to_update)]
    logger.critical(f"Club IDs to treat: {club_ids_to_fetch}")

    for i in club_ids_to_fetch:
        club = requests.get(url=base_url + str(i)).json()
        await _upsert_club_in_db(db, club)

    if len(club_ids_to_fetch) > 0:
        await _update_vars(db, last_treated_club_id_var, club_ids_to_fetch[-1])


async def _get_last_treated_club_id(db):

    last_treated_club_record = await db.vars.find_one({"var": last_treated_club_id_var})

    if last_treated_club_record:
        return last_treated_club_record["value"]

    return 0


async def _upsert_club_in_db(db, club):

    club = {
        "id": club["id"],
        "status": club["status"],
        "name": club["name"],
        "division": club["division"],
        "city": club["city"],
        "country": club["country"],
        "foundation_date": club["foundationDate"] if club["status"] == "FOUNDED" else None,
        "last_computation_date": datetime.datetime.now(),
    }
    
    return await db.clubs.replace_one({"_id": club["id"]}, club, upsert=True)


async def _update_vars(db, var, value):
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