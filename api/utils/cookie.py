from config import ENVIRONMENT, ORIGINS
from datetime import datetime


def set_cookie(request, response, name, value, max_age):
    if ENVIRONMENT == "dev":
        response.set_cookie(
            key=name,
            value=value,
            path="/",
            domain=None,
            secure=True,
            httponly=True,
            max_age=max_age
        )
    else:
        origin = request.environ['HTTP_ORIGIN']
        domains = [d for d in ORIGINS.split(",") if d in origin]

        for d in domains:
            response.set_cookie(
                key=name,
                value=value,
                path="/",
                domain=d,
                secure=True,
                httponly=True,
                max_age=max_age
            )

    return response
