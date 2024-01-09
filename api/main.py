from fastapi import FastAPI, Depends, HTTPException
from fastapi_mail import ConnectionConfig, FastMail
from graphene import Schema
from starlette_graphene3 import GraphQLApp, make_graphiql_handler
from motor.motor_asyncio import AsyncIOMotorClient
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from graph.query import Query
import config


# FastAPI setup
app = FastAPI()

# Plugins
db = AsyncIOMotorClient(config.MONGO_DB_URL)["mfl-assistant"]
mail = FastMail(ConnectionConfig(**config.MAIL_CONFIG))

app.add_middleware(
    CORSMiddleware,
    allow_origins=config.ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_route(
    "/graphql",
    GraphQLApp(
        schema=Schema(query=Query),
        on_get=make_graphiql_handler()
    )
)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000)