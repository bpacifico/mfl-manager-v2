from bson import ObjectId
from fastapi_mail import MessageSchema
from config import HOST
import datetime

from utils.env import get_webapp_url


def _load_template(body):
    template = open("mail/templates/template.html", 'r').read()
    template = template.replace("{body}", body)
    return template


async def send_confirmation_mail(mail, address, confirmation_code):
    body = open("mail/templates/confirmation_mail.html", 'r').read()
    body = body.format(host=HOST, confirmation_code=confirmation_code)
    body = _load_template(body)

    message = MessageSchema(
        subject="[MFL-M] Email address confirmation",
        recipients=[address],
        subtype="html",
        body=body,
    )

    try:
        await mail.send_message(message)
    except Exception as e:
        raise
