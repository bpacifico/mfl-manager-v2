from config import ENVIRONMENT, ORIGINS


def set_cookie(request, response, name, value, expires):
    if ENVIRONMENT == "dev":
        response.set_cookie(
            key=name,
            value=value,
            path="/",
            domain="127.0.0.1:3000",
            secure=True,
            httponly=False,
            samesite=None,
            #expires=expires
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
                expires=expires
            )

    return response
