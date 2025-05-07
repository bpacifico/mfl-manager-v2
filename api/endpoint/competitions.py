from fastapi import APIRouter, HTTPException, Depends, Request
from main import db as raw_db
from graph.query import schema

router = APIRouter()

# Fonction de dépendance pour récupérer la base de données
def get_db():
    return raw_db

# Endpoint REST qui exécute la requête GraphQL
async def get_competition(competition_id: int, request: Request, db=Depends(get_db)):
    query = f"""
    query {{
      competition(id: {competition_id}) {{
        id
        name
        participants {{
          id
          name
          country
          city
          logoVersion
          B11
          B16A
          IG11
          playerNb
          MMR
        }}
      }}
    }}
    """

    # Contexte nécessaire pour le resolver GraphQL
    context = {"request": request, "db": db}

    # Exécute la requête GraphQL
    result = await schema.execute_async(query, context_value=context)

    if result.errors:
        raise HTTPException(status_code=500, detail=str(result.errors))

    return result.data["competition"]
