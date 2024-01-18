from fastapi import FastAPI, Depends, HTTPException
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
import threading
from cron import compute_notifications
from endpoint.generate_nonce import generate_nonce
from endpoint.confirm_email import confirm_email


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
    context_value={"db": db, "mail": mail},
)
graphql_admin = GraphQLApp(
    schema=Schema(query=Query, mutation=Mutation),
    on_get=make_graphiql_handler(),
    context_value={"db": db, "mail": mail},
)

# Manage routes

app.add_route("/graphql", graphql)
app.add_route("/graphql/admin", graphql_admin)
app.add_route("/api/generate_nonce", generate_nonce)
app.add_route("/api/confirm_email", confirm_email)

# Manage crons

scheduler = AsyncIOScheduler()
scheduler.add_job(compute_notifications.main, 'interval',  args=[app, db, mail], seconds=10)
scheduler.start()


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=config.PORT)