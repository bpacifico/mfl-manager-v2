from fastapi_mail import MessageSchema
from bson import ObjectId
import datetime
import requests


base_url = "https://z519wdyajg.execute-api.us-east-1.amazonaws.com/prod/"
list_url = base_url + "listings?limit=25&type=PLAYER&status=AVAILABLE"
sale_url = base_url + "listings?limit=25&type=PLAYER&status=BOUGHT&sorts=listing.purchaseDateTime&sortsOrders=DESC"

last_list_var = "last_treated_listing_id"
last_sale_var = "last_treated_sale_datetime"


async def main(app, db, mail):
    print("aaa")
    users = await _get_users(db)
    user_ids = [u["_id"] for u in users]
    
    scopes = await _get_notification_scopes(db, user_ids)
    listing_scopes = [s for s in scopes if s["type"] == "listing"]
    sale_scopes = [s for s in scopes if s["type"] == "sale"]

    print(users, scopes, listing_scopes, sale_scopes)

    # Treat listing scopes

    listings = await _get_listings_to_treat(db)

    print("listing to treat", listings)

    if len(listings) > 0:
        await _update_vars(db, last_list_var, listings[0]["listingResourceId"])

        for scope in listing_scopes:
            filtered_listings = await _filter_listings_per_scope(db, scope, listings)
            player_ids = [listing["player"]["id"] for listing in filtered_listings]

            if len(player_ids) > 0:
                notification = await _add_notification_in_db(db, scope["_id"], player_ids)
                await _send_email(db, mail, notification.inserted_id)

    # Treat sale scopes

    sales = await _get_sales_to_treat(db)

    print("sales to treat", sales)

    if len(sales) > 0:
        await _update_vars(db, last_sale_var, sales[0]["listingResourceId"])

        for scope in sale_scopes:
            filtered_sales = await _filter_sales_per_scope(db, scope, sales)
            player_ids = [sale["player"]["id"] for sale in filtered_sales]

            if len(player_ids) > 0:
                notification = await _add_notification_in_db(db, scope["_id"], player_ids)
                await _send_email(db, mail, notification.inserted_id)


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
        listings = [listing for listing in listings if listing["listingResourceId"] > last_listing_var_record["value"]]

    return listings


async def _get_sales_to_treat(db):
    sales = requests.get(url=sale_url).json()

    last_sale_var_record = await db.vars.find_one({"var": last_sale_var})

    if last_sale_var_record:
        sales = [sale for sale in sales if sale["listingResourceId"] > last_sale_var_record["value"]]

    return sales


async def _filter_listings_per_scope(db, scope, listings):
    # TODO
    return listings


async def _filter_sales_per_scope(db, scope, sales):
    # TODO
    return sales


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


async def _send_email(db, mail, notification_id):
    message = MessageSchema(
        subject="[MFL-A] New notification",
        recipients=["test@test.com"],
        body="Oui",
        subtype="html"
    )
    
    try:
        await mail.send_message(message)
        
        filters = {"_id": ObjectId(notification_id)}
        update_data = {
            "status": "sent",
            "sending_date": datetime.datetime.now(),
        }

        await db.notifications.update_one(filters, {"$set": update_data})

        return {"message": "Email sent successfully"}
    except Exception as e:
        raise
