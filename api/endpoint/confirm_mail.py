from fastapi.responses import HTMLResponse
from main import db


def confirm_mail(self, confirmation_code=None):

    if confirmation_code is not None:

        user = db.users.find_one({"confirmation_code": {"$eq": confirmation_code}})

        if user:
            user["confirmation_code"] = None
            user["is_email_confirmed"] = True
            db.users.update_one({"confirmation_code": confirmation_code}, {"$set": user})

            return HTMLResponse(content="<p>The email has been confirmed</p>")

    return HTMLResponse(content="<p>Unknown confirmation code</p>")
