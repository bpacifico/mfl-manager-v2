import datetime
import requests
import logging
from utils.db import get_var_value, upsert_vars, build_and_upsert_player, build_and_upsert_club, build_and_upsert_sale 


base_url = "https://z519wdyajg.execute-api.us-east-1.amazonaws.com/prod/listings/feed?limit=25"
max_past_sale_batches_to_update = 1

last_treated_sale_datetime_var = "last_treated_sale_datetime"

logger = logging.getLogger("collect_sales")
logger.setLevel(logging.INFO)


async def main(db):

    last_treated_sale_datetime = await get_var_value(db, last_treated_sale_datetime_var)
    new_last_treated_sale_datetime = None
    next_before_listing_id = None
    continue_treatment = True

    # Treat the new ones

    while continue_treatment:
        logger.critical("collect_sales: Treat new ones, next_before_listing_id: " + str(next_before_listing_id))

        response = requests.get(
            url=base_url + ("" if next_before_listing_id is None else f"&beforeListingId={next_before_listing_id}")
        )

        if response.status_code == 200:
            sales = response.json()

            for s in sales:
                if new_last_treated_sale_datetime is None:
                    new_last_treated_sale_datetime = s["purchaseDateTime"]

                if continue_treatment:
                    if last_treated_sale_datetime is None or s["purchaseDateTime"] > last_treated_sale_datetime:
                        logger.critical("collect_sales: Treat: " + str(s["id"]))
                        player = await build_and_upsert_player(db, s["player"]) if "player" in s else None
                        club = await build_and_upsert_club(db, s["club"]) if "club" in s else None
                        sale = await build_and_upsert_sale(db, s, player, club)
                    else:
                        continue_treatment = False

            if last_treated_sale_datetime is None:
                continue_treatment = False
            else:
                next_before_listing_id = sales[-1]["id"]

    await upsert_vars(db, last_treated_sale_datetime_var, new_last_treated_sale_datetime)

    # Treat the old ones


async def _build_and_upsert_player(db, mfl_player):
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


async def _build_and_upsert_sale(db, mfl_sale, player, club):

    sale = {
        "_id": mfl_sale["id"],
        "price": mfl_sale["price"],
        "execution_date": mfl_sale["purchaseDateTime"],
    }

    if player is not None:
        sale["player"] = player["_id"]

    if club is not None:
        sale["club"] = club["_id"]
    
    return await upsert_sale(db, sale)
