from functools import wraps

from bson import ObjectId
from fastapi import HTTPException, status
import jwt
from utils.jwt import verify_token
from fastapi import Request


def require_token(f):
    @wraps(f)
    def wrapper(root, info, *args, **kwargs):
        request = info.context["request"]
        authorization = request.headers.get("Authorization")

        if not authorization:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Authorization header is missing",
            )

        token = authorization.split(" ")[1]

        # Verify and decode the JWT token
        try:
            decoded = verify_token(token)
            print(decoded)
            user = info.context["db"].find_one({"_id": ObjectId(decoded)})
            if not user:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid token",
                )
        except jwt.ExpiredSignatureError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token has expired",
            )
        except jwt.InvalidTokenError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token",
            )

        # Add the user to the info.context
        info.context["user"] = user

        # Call the original function
        return f(root, info, *args, **kwargs)

    return wrapper
