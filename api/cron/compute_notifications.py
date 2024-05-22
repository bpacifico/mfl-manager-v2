from bson import ObjectId
import datetime
import requests
import logging

from mail.mail_manager import send_listing_email, send_sale_email


base_url = "https://z519wdyajg.execute-api.us-east-1.amazonaws.com/prod/"
list_url = base_url + "listings?limit=25&type=PLAYER&status=AVAILABLE"
sale_url = base_url + "listings?limit=25&type=PLAYER&status=BOUGHT&sorts=listing.purchaseDateTime&sortsOrders=DESC"

last_list_var = "last_treated_listing_datetime"
last_sale_var = "last_treated_sale_datetime"

logger = logging.getLogger("compute_notification")
logger.setLevel(logging.INFO)


async def main(db, mail):
    users = await _get_users(db)
    user_ids = [u["_id"] for u in users]
    logger.critical(f"Number of users to treat: {len(user_ids)}")
    
    scopes = await _get_notification_scopes(db, user_ids)
    listing_scopes = [s for s in scopes if s["type"] == "listing"]
    sale_scopes = [s for s in scopes if s["type"] == "sale"]
    logger.critical(f"Number of listing scopes to treat: {len(listing_scopes)}")
    logger.critical(f"Number of sale scopes to treat: {len(listing_scopes)}")

    # Treat listing scopes

    listings = await _get_listings_to_treat(db)
    logger.critical(f"Number of listings to treat: {len(listings)}")

    if len(listings) > 0:
        await _update_vars(db, last_list_var, listings[0]["createdDateTime"])

        for scope in listing_scopes:
            filtered_listings = await _filter_listings_per_scope(scope, listings)
            player_ids = [listing["player"]["id"] for listing in filtered_listings]
            logger.critical(f"{len(player_ids)} - {len(filtered_listings)}")

            if len(player_ids) > 0:
                user = [u for u in users if u["_id"] == scope["user"]]
                logger.critical(f"{len(user)}")

                if len(user) > 0:
                    logger.critical(f"Listing notification to send with {len(player_ids)} players")
                    user = user.pop()
                    notification = await _add_notification_in_db(db, scope["_id"], player_ids)
                    await send_listing_email(db, mail, notification, user, player_ids)

    # Treat sale scopes

    sales = await _get_sales_to_treat(db)
    logger.critical(f"Number of sales to treat: {len(sales)}")

    if len(sales) > 0:
        await _update_vars(db, last_sale_var, sales[0]["createdDateTime"])

        for scope in sale_scopes:
            filtered_sales = await _filter_listings_per_scope(scope, sales)
            player_ids = [sale["player"]["id"] for sale in filtered_sales]

            if len(player_ids) > 0:
                user = [u for u in users if u["_id"] == scope["user"]]

                if len(user) > 0:
                    logger.critical(f"Sale notification to send with {len(player_ids)} players")
                    user = user.pop()
                    notification = await _add_notification_in_db(db, scope["_id"], player_ids)
                    await send_sale_email(db, mail, notification, user, player_ids)


async def _get_users(db):
    filters = {
        "email": {"$regex": r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'},
        "is_email_confirmed": True,
    }
    
    return await db.users.find(filters).to_list(length=None)


async def _get_notification_scopes(db, user_ids):
    filters = {
        "user": {"$in": user_ids},
        "status": "active",
    }
    
    return await db.notification_scopes.find(filters).to_list(length=None)


async def _get_listings_to_treat(db):
    listings = requests.get(url=list_url).json()

    last_listing_var_record = await db.vars.find_one({"var": last_list_var})

    if last_listing_var_record:
        listings = [listing for listing in listings if listing["createdDateTime"] > last_listing_var_record["value"]]

    return listings


async def _get_sales_to_treat(db):
    sales = requests.get(url=sale_url).json()

    last_sale_var_record = await db.vars.find_one({"var": last_sale_var})

    if last_sale_var_record:
        sales = [sale for sale in sales if sale["createdDateTime"] > last_sale_var_record["value"]]

    return sales


async def _filter_listings_per_scope(scope, listings):
    return [
        l for l in listings
        if ("min_price" not in scopescope["min_price"] is None or scope["min_price"] <= l["price"])
        and ("max_price" not in scope or scope["max_price"] is None or scope["max_price"] >= l["price"])
        and ("min_age" not in scopescope["min_age"] is None or scope["min_age"] <= l["player"]["metadata"]["ageAtMint"])
        and ("max_age" not in scopescope["max_age"] is None or scope["max_age"] >= l["player"]["metadata"]["ageAtMint"])
        and ("min_ovr" not in scopescope["min_ovr"] is None or scope["min_ovr"] <= l["player"]["metadata"]["overall"])
        and ("max_ovr" not in scopescope["max_ovr"] is None or scope["max_ovr"] >= l["player"]["metadata"]["overall"])
        and ("min_pac" not in scopescope["min_pac"] is None or scope["min_pac"] <= l["player"]["metadata"]["pace"])
        and ("max_pac" not in scopescope["max_pac"] is None or scope["max_pac"] >= l["player"]["metadata"]["pace"])
        and ("min_dri" not in scopescope["min_dri"] is None or scope["min_dri"] <= l["player"]["metadata"]["dribbling"])
        and ("max_dri" not in scopescope["max_dri"] is None or scope["max_dri"] >= l["player"]["metadata"]["dribbling"])
        and ("min_pas" not in scopescope["min_pas"] is None or scope["min_pas"] <= l["player"]["metadata"]["passing"])
        and ("max_pas" not in scopescope["max_pas"] is None or scope["max_pas"] >= l["player"]["metadata"]["passing"])
        and ("min_sho" not in scopescope["min_sho"] is None or scope["min_sho"] <= l["player"]["metadata"]["shooting"])
        and ("max_sho" not in scopescope["max_sho"] is None or scope["max_sho"] >= l["player"]["metadata"]["shooting"])
        and ("min_def" not in scopescope["min_def"] is None or scope["min_def"] <= l["player"]["metadata"]["defense"])
        and ("max_def" not in scopescope["max_def"] is None or scope["max_def"] >= l["player"]["metadata"]["defense"])
        and ("min_phy" not in scopescope["min_phy"] is None or scope["min_phy"] <= l["player"]["metadata"]["physical"])
        and ("max_phy" not in scopescope["max_phy"] is None or scope["max_phy"] >= l["player"]["metadata"]["physical"])
    ]


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


async def _add_notification_in_db(db, notification_scope_id, player_ids):
    notification = {
        "status": "await",
        "player_ids": player_ids,
        "creation_date": datetime.datetime.now(),
        "notification_scope": notification_scope_id,
    }
    
    return await db.notifications.insert_one(notification)
