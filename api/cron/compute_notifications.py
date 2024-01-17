from fastapi_mail import MessageSchema


def compute_notifications(app, db, mail):
    _send_email()
    print("yyee")

def get_users_and_notification_scopes():
        pass

async def _send_email():
    message = MessageSchema(
        subject="[MFL-A] New notification",
        recipients=["test@test.com"],
        body="Oui",
        subtype="html"
    )
    
    try:
        await mail.send_message(message)
        return {"message": "Email sent successfully"}
    except Exception as e:
        print("eee")
        raise HTTPException(status_code=500, detail=f"Failed to send email: {str(e)}")
