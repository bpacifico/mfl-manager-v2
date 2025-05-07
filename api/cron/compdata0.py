import sys
import datetime
import requests
import logging
from utils.db import get_var_value, upsert_vars, build_and_upsert_competition, build_and_upsert_club
from utils.date import convert_unix_to_datetime

competId=sys.argv[1]

base_url = "https://z519wdyajg.execute-api.us-east-1.amazonaws.com/prod/competitions"


logger = logging.getLogger("collect_competition_data")
logger.setLevel(logging.INFO)
logger.critical("competition data")

async def main(db):

    competition_id_list = [competId]

    if competition_id_list is not None :
        logger.critical(f"{competition_id_list[0]}")

        if competition_id_list != [] :
            response = requests.get(
                url=base_url + (f"/{competition_id_list[0]}")
            )
            logger.critical(f"competition to be fetched {competition_id_list[0]}")

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

                competition_id_list.pop(0)
                await upsert_vars(db, competition_id_list_var, competition_id_list)

    return 0