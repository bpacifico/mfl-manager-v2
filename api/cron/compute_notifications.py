from fastapi_mail import MessageSchema
from bson import ObjectId
import datetime


def compute_notifications(app, db, mail):
    users = _get_users()
    user_ids = [ObjectId(u["id"]) for u in users]
    scopes = _get_notification_scopes(user_ids)

    for scope in scopes:
        _add_notification_in_db(db)
        _send_email()

        pipeline = [
            {"$match": {"user_id": {"$in": object_ids}}},
            {"$sort": {"user_id": 1, "record_date": -1}},
            {"$group": {
                "_id": "$user_id",
                "records": {"$push": "$$ROOT"}
            }},
            {"$project": {
                "latest_records": {"$slice": ["$records", num_records]}
            }}
        ]
    

def _get_users():
    filters = {
        "email": {"$regex": r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'},
        "is_email_confirmed": True,
    }
    
    return await db.users.find(filters).to_list(length=None)

def _get_notification_scopes(user_ids):
    filters = {
        "user": {"$in": object_ids}
    }
    
    return await db.notification_scopes.find(filters).to_list(length=None)


def _add_notification_in_db(db, notification_scope_id, player_ids):
    notification = {
        "status": "await",
        "player_ids": player_ids,
        "creation_date": datetime.datetime.now(),
        "notification_scope": ObjectId(notification_scope_id),
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


"""

    id = ID(source='_id')
    status = String()
    player_ids = List(lambda: Int())
    creation_date = DateTime()
    sending_date = DateTime()
    notification_scope = Field(NotificationScopeType)
"""