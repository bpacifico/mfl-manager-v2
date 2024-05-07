from fastapi import FastAPI, Request
from fastapi_mail import ConnectionConfig, FastMail
from apscheduler.schedulers.asyncio import AsyncIOScheduler 
from graphene import Schema
from starlette_graphene3 import GraphQLApp, make_graphiql_handler
from motor.motor_asyncio import AsyncIOMotorClient
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from graph.query import Query
from graph.mutation import Mutation
import config
from cron import compute_notifications
from endpoint.generate_nonce import generate_nonce
from endpoint.confirm_email import confirm_email
from utils.jwt import create_access_token


# FastAPI setup

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=config.ORIGINS,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Plugins

db = AsyncIOMotorClient(config.DB_URL)[config.DB_CONFIG["database"]]
mail = FastMail(ConnectionConfig(**config.MAIL_CONFIG))
graphql = GraphQLApp(
    schema=Schema(query=Query, mutation=Mutation),
    on_get=make_graphiql_handler(),
    #context_value={"db": db, "mail": mail},
)
graphql_admin = GraphQLApp(
    schema=Schema(query=Query, mutation=Mutation),
    on_get=make_graphiql_handler(),
    #context_value={"db": db, "mail": mail},
)

# To move in right file later

from fastapi.responses import HTMLResponse


async def confirm_mail(request: Request):
    confirmation_code = request.query_params.get('confirmation_code')

    if confirmation_code is not None:

        user = await db.users.find_one({"confirmation_code": {"$eq": confirmation_code}})

        if user:
            user["confirmation_code"] = None
            user["is_email_confirmed"] = True
            db.users.update_one({"confirmation_code": confirmation_code}, {"$set": user})

            return HTMLResponse(content="<p>The email has been confirmed</p>")

    return HTMLResponse(content="<p>Unknown confirmation code</p>")

# To move in right file later


async def login(request: Request, response: Response):
    address = request.query_params.get('address')

    if address is not None:

        user = await db.users.find_one({"address": {"$eq": address}})

        if user:
            access_token_expires = timedelta(minutes=24 * 60)
            token = create_access_token({"address": address})

            response.set_cookie(key="access_token_cookie", value=f"Bearer {token[0]}", httponly=True)
            return response

    return HTMLResponse(content="Address Unknown")


# Manage routes

app.add_route("/graphql", graphql)
app.add_route("/graphql/admin", graphql_admin)
app.add_route("/api/generate_nonce", generate_nonce)
app.add_route("/api/confirm_email", confirm_email)
app.add_route("/api/confirm_mail", confirm_mail)
app.add_route("/api/login", login)

# Manage cron

scheduler = AsyncIOScheduler()
scheduler.add_job(compute_notifications.main, 'interval',  args=[db, mail], seconds=60)
scheduler.start()


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=config.PORT)
