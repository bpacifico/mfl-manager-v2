from functools import wraps

from bson import ObjectId
from fastapi import HTTPException, status
import jwt
from utils.jwt import verify_token
from fastapi import Request
import inspect


def require_token(f):
    @wraps(f)
    async def wrapper(root, info, *args, **kwargs):
        request = info.context["request"]
        token = request.cookies.get('access_token_cookie')

        try:
            decoded = verify_token(token)
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

        if not decoded["address"]:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token doesn't hold correct information",
            )

        user = await info.context["db"].users.find_one({"address": decoded["address"]})
            
        if not user:
            info.context["db"].users.insert_one({"address": decoded["address"]})
            user = await info.context["db"].users.find_one({"address": decoded["address"]})

        info.context["user"] = user

        if inspect.iscoroutinefunction(f):
            return await f(root, info, *args, **kwargs)
        else:
            return f(root, info, *args, **kwargs)

    return wrapper
