from bson import ObjectId
import datetime
import requests
import logging
from utils.db import upsert_vars, get_var_value, build_and_upsert_user, build_and_upsert_club
from utils.compute_ratings import compute_B11, compute_B16, compute_formations
from utils.player import positions, formations

base_url = "https://z519wdyajg.execute-api.us-east-1.amazonaws.com/prod/clubs/"


logger = logging.getLogger("collect_clubs")
logger.setLevel(logging.DEBUG)


async def main(db):
	logging.critical('début get club')
	club_id_list = []

	for i in club_id_list:
		response = requests.get(url=base_url + str(i))
		logger.critical(f"collect_clubs: Response status: {response.status_code} with id {i}")
		print(i)
		if response.status_code == 200:
			data = response.json()
			logging.critical(data)
			user = None

			if "ownedBy" in data and "walletAddress" in data["ownedBy"]:
				user = await build_and_upsert_user(
					db,
					data["ownedBy"]
				)

			logging.critical(f"club fetch : id {data['id']}")
			

			response = requests.get(url=base_url + str(i)+"/players")
			if response.status_code == 200:

				logger.critical(f"players of club id {i} collected")
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

			

	return 0

