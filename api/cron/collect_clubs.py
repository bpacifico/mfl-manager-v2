from bson import ObjectId
import datetime
import requests
import logging
from utils.db import upsert_vars, insert_user_if_not_exists


base_url = "https://z519wdyajg.execute-api.us-east-1.amazonaws.com/prod/clubs/"
max_clubs_to_update = 1

last_treated_club_id_var = "last_treated_club_id"

logger = logging.getLogger("collect_clubs")
logger.setLevel(logging.INFO)


async def main(db):

    last_id = await _get_last_treated_club_id(db)

    club_ids_to_fetch = [x for x in range(last_id + 1, last_id + 1 + max_clubs_to_update)]
    logger.critical(f"Club IDs to treat: {club_ids_to_fetch}")

    for i in club_ids_to_fetch:
        response = requests.get(url=base_url + str(i))

        if response.status_code == 200:
            data = response.json()
            user = await insert_user_if_not_exists(db, data["ownedBy"]["walletAddress"])
            club = await _upsert_club_in_db(db, response.json(), user)
        
        if response.status_code == 404:
            await upsert_vars(db, last_treated_club_id_var, 0)

    if len(club_ids_to_fetch) > 0:
        await upsert_vars(db, last_treated_club_id_var, club_ids_to_fetch[-1])


async def _get_last_treated_club_id(db):

    last_treated_club_record = await db.vars.find_one({"var": last_treated_club_id_var})

    if last_treated_club_record:
        return last_treated_club_record["value"]

    return 0


async def _upsert_club_in_db(db, club, user):

    club = {
        "id": club["id"],
        "status": club["status"],
        "name": club["name"],
        "division": club["division"],
        "city": club["city"],
        "country": club["country"],
        "foundation_date": club["foundationDate"] if club["status"] == "FOUNDED" else None,
        "last_computation_date": datetime.datetime.now(),
        "owner": user["_id"]
    }
    
    return await db.clubs.replace_one({"_id": club["id"]}, club, upsert=True)
