from fastapi_mail import MessageSchema
from bson import ObjectId
import datetime
import requests


base_url = "https://z519wdyajg.execute-api.us-east-1.amazonaws.com/prod/"
list_url = base_url + "listings?limit=25&type=PLAYER"
sale_url = base_url + "listings?limit=25&type=PLAYER&status=BOUGHT"


async def main(app, db, mail):
    users = await _get_users(db)
    user_ids = [u["_id"] for u in users]
    
    scopes = await _get_notification_scopes(db, user_ids)
    listing_scopes = [s for s in scopes if s["type"] == "listing"]
    sale_scopes = [s for s in scopes if s["type"] == "sale"]

    print("scopes", len(scopes))
    print("listing_scopes", len(listing_scopes))
    print("sale_scopes", len(sale_scopes))

    # Treat listing scopes

    # listings = requests.get(url=list_url).json()

    for s in listing_scopes:
        print("treatment", s)
        player_ids = await _find_players(db, s)

        if len(player_ids) > 0:
            await _add_notification_in_db(db, s["_id"], [153, 1593])
            await _send_email(db, mail)

    # Treat listing scopes

    # sales = requests.get(url=sale_url).json()

    for s in listing_scopes:
        player_ids = await _find_players(db, s)

        if len(player_ids) > 0:
            await _add_notification_in_db(db, s["_id"], [2222, 22222])
            await _send_email(db, mail)


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


async def _find_players(db, scope):
    # TODO
    return [153, 1593] if scope["type"] == "listing" else [222]


async def _add_notification_in_db(db, notification_scope_id, player_ids):
    notification = {
        "status": "await",
        "player_ids": player_ids,
        "creation_date": datetime.datetime.now(),
        "notification_scope": notification_scope_id,
    }
    
    return await db.notifications.insert_one(notification)


async def _send_email(db, notification_id):
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

        result = await db.notifications.update_one(filters, {"$set": update_data})

        return {"message": "Email sent successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send email: {str(e)}")
