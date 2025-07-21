from bson import ObjectId
import datetime
import requests
import logging
from utils.db import upsert_vars, get_var_value, build_and_upsert_user, build_and_upsert_club
from utils.compute_ratings import compute_B11, compute_B16, compute_formations
from utils.player import positions, formations

base_url = "https://z519wdyajg.execute-api.us-east-1.amazonaws.com/prod/clubs/"
max_clubs_to_update = 15000

club_id_list_var = "club_id_list"

logger = logging.getLogger("collect_clubs")
logger.setLevel(logging.INFO)


async def main(db):

	club_ids_to_fetch = list(range(8700))
	await upsert_vars(db, club_id_list_var, club_id_list[max_clubs_to_update:])

	for i in club_ids_to_fetch:
		response = requests.get(url=base_url + str(i))
		logger.critical(f"collect_clubs: Response status: {response.status_code} with id {i}")

		if response.status_code == 200:
			data = response.json()
			user = None

			if "ownedBy" in data and "walletAddress" in data["ownedBy"]:
				user = await build_and_upsert_user(
					db,
					data["ownedBy"]
				)
			

			response = requests.get(url=base_url + str(i)+"/players")
			if response.status_code == 200:

				players = response.json()
				data['playerNb']=len(players)

				if len(players) > 0 : 
					try :
						data['B11'] = compute_B11(players)
						B11A=data['B11']/11*100
						data['B16A'] = int(compute_B16(players))
						formations_club = compute_formations(players,positions,formations)
						data['IG11'] = int(round(formations_club[0]['rating']/11,2)*100)
						Alt=0.5*(formations_club[1]['rating']/11+formations_club[2]['rating']/11)*100
						data['MMR'] = int(round(0.25*(B11A+data['B16A']+data['IG11']+Alt),0))
					except Exception as e : 
						logging.critical(e)
			club = await build_and_upsert_club(db, data, user)


		if response.status_code == 404:
			if not added_clubs:
				club_ids_to_fetch.append(club_ids_to_fetch[-1] + 1)
				added_clubs = True

			if added_clubs and club_ids_to_fetch[-1] == i:
				reset_var = True
				break

	return 0
