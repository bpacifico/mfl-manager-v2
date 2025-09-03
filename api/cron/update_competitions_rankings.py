from datetime import datetime
import requests
import logging
from utils.date import convert_unix_to_datetime
from utils.db import get_var_value, upsert_vars, build_and_upsert_competition, build_and_upsert_club



base_url = "https://z519wdyajg.execute-api.us-east-1.amazonaws.com/prod/competitions?upcoming=true"

base_url_compet = "https://z519wdyajg.execute-api.us-east-1.amazonaws.com/prod/competitions"

logger = logging.getLogger("collect_competitions")
logger.setLevel(logging.INFO)

async def main(db):
    response = requests.get(
        url=base_url
    )

    if response.status_code == 200:
        competitions = response.json()
        competitions=[c for c in competitions if c.get("status") == "LIVE" and c.get("type")=='LEAGUE']
    else :
        logger.critical("Error fetching competitions. Update cancelled")
        return 0


    for c in competitions :
            response = requests.get(
                url=base_url_compet + (f"/{str(c['id'])}")
            )
            logger.critical(f"competition to be fetched {c['id']}")

            if response.status_code == 200:
                competition = response.json()

                rankings = competition['schedule']['stages'][0]['groups'][0]['members'] 
                now = datetime.utcnow()

                # ajout de played à chaque entrée
                for r in rankings:
                    r["played"] = r.get("wins", 0) + r.get("draws", 0) + r.get("losses", 0)
                    r.pop("lastMatches", None)

                snapshot = {
                    "date": now,
                    "rankings": rankings
                }

                competition = await build_and_upsert_competition(db, competition)
                
                await db.competitions.update_one(
                    {"_id": competition["_id"]},   # ta compétition en cours
                    {"$push": {"rankingHistory": snapshot}}
                )




    return 0