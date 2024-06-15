from bson import ObjectId
import datetime
import requests
import logging
from utils.db import upsert_vars, get_var_value, upsert_user, build_and_upsert_club


base_url = "https://z519wdyajg.execute-api.us-east-1.amazonaws.com/prod/clubs/"
max_clubs_to_update = 30

last_treated_club_id_var = "last_treated_club_id"

logger = logging.getLogger("collect_clubs")
logger.setLevel(logging.INFO)


async def main(db):

    last_id = await get_var_value(db, last_treated_club_id_var)
    reset_var = False

    if last_id is None:
        last_id = 0

    club_ids_to_fetch = [x for x in range(last_id + 1, last_id + 1 + max_clubs_to_update)]
    logger.critical(f"Club IDs to treat: {club_ids_to_fetch}")

    for i in club_ids_to_fetch:
        response = requests.get(url=base_url + str(i))
        logger.critical(f"collect_clubs: Response status: {response.status_code} with id {i}")

        if response.status_code == 200:
            data = response.json()
            user = None

            if "ownedBy" in data and "walletAddress" in data["ownedBy"]:
                user = await upsert_user(
                    db,
                    data["ownedBy"]["walletAddress"],
                    data["ownedBy"]["name"]
                )

            club = await build_and_upsert_club(db, response.json(), user)
        
        if response.status_code == 404:
            reset_var = True
            break

    if reset_var:
        await upsert_vars(db, last_treated_club_id_var, 0)
    else:
        if len(club_ids_to_fetch) > 0:
            await upsert_vars(db, last_treated_club_id_var, club_ids_to_fetch[-1])


async def _get_last_treated_club_id(db):

    last_treated_club_record = await db.vars.find_one({"var": last_treated_club_id_var})

    if last_treated_club_record:
        return last_treated_club_record["value"]

    return 0
