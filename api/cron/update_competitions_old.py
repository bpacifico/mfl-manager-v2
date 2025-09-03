import datetime
import requests
import logging
from utils.date import convert_unix_to_datetime
from utils.db import get_var_value, upsert_vars, build_and_upsert_competition, build_and_upsert_club



base_url = "https://z519wdyajg.execute-api.us-east-1.amazonaws.com/prod/competitions?upcoming=true"
base_url_compet = "https://z519wdyajg.execute-api.us-east-1.amazonaws.com/prod/competitions"

logger = logging.getLogger("collect_competitions")
logger.setLevel(logging.INFO)
minId =9999
maxId=0

async def main(db):
    minId =9999
    maxId=0
    response = requests.get(
        url=base_url
    )

    if response.status_code == 200:
        competitions = response.json()

        if len(competitions) > 0:
            for c in competitions:
                if c['id'] > maxId : 
                    maxId = c['id']
                if c['id'] < minId :
                    minId = c['id']
                competition = await build_and_upsert_competition(db, c)

    
    logger.critical(minId)
    logger.critical(maxId)
    competition_id_list = range(minId,maxId+1)

    for competition in competition_id_list :
            response = requests.get(
                url=base_url_compet + (f"/{competition}")
            )
            logger.critical(f"competition to be fetched {competition}")

            if response.status_code == 200:
                competition = response.json()

                clubs=[]
                user = None
                if "schedule" in competition :
                    for group in competition['schedule']['stages'][0]['groups'] :
                        for member in group['members'] : 
                            club = await db.clubs.find_one({"_id":member['clubId']})
                            if club : 
                                clubs.append(club)
                            else : 
                                new_club = {
                                        "_id": member['clubId']
                                    } 

                                club = await   build_and_upsert_club(db,new_club,user)
                                

                                clubs.append(new_club)

                competition['participants'] = clubs

                competition = await build_and_upsert_competition(db, competition)




    return 0