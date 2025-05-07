import datetime
import requests
import logging
from utils.db import get_var_value, upsert_vars, build_and_upsert_competition, build_and_upsert_club
from utils.date import convert_unix_to_datetime


base_url = "https://z519wdyajg.execute-api.us-east-1.amazonaws.com/prod/competitions"

competition_id_list_var = "competition_id_list"

logger = logging.getLogger("collect_competition_data")
logger.setLevel(logging.INFO)
logger.critical("competition data")

async def main(db):

    logger.critical("competition data start ??")
    competition_id_list = await get_var_value(db, competition_id_list_var)
    logging.critical(competition_id_list)

    if competition_id_list is not None :

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
            
        else : 
            ### re-initialize the list of competitions to fetch 
            logger.critical("competition id list empty")
            live_competitions_cursor = db.competitions.find({"status": "LIVE"}, {"_id": 1})
            live_competition_ids = [comp["_id"] async for comp in live_competitions_cursor]
            await upsert_vars(db, competition_id_list_var, live_competition_ids)


    else : 
        ### initialize the list of competitions to fetch 
        logger.critical("no competition id list")
        live_competitions_cursor = db.competitions.find({"status": "LIVE"}, {"_id": 1})
        live_competition_ids = [comp["_id"] async for comp in live_competitions_cursor]
        await upsert_vars(db, competition_id_list_var, live_competition_ids)

    return 0