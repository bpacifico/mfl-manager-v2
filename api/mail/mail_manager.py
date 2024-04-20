from fastapi_mail import MessageSchema


async def send_confirmation_mail(mail, address, confirmation_code):
    body = open("mail/templates/confirmation_mail.html", 'r').read()

    message = MessageSchema(
        subject="[MFL-A] Email confirmation",
        recipients=[address],
        subtype="html",
        body=body.format(confirmation_code=confirmation_code),
        variables={
            "confirmation_code": confirmation_code,
        },
    )

    try:
        await mail.send_message(message)
    except Exception as e:
        raise
