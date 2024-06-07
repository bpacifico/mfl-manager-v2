import datetime
import logging

logger = logging.getLogger("compute_club_count_per_day")
logger.setLevel(logging.INFO)

data_property = "founded_club_count"


async def main(db):

	pipeline = [
	    {"$match": {"foundation_date": {"$ne": None}, "status": "FOUNDED"}},
	    {"$project": {"date": {"$toDate": {"$toLong": "$foundation_date"}}}},
	    {"$group": {"_id": {"$dateToString": {"format": "%Y-%m-%d", "date": "$date"}}, "count": {"$sum": 1}}},
	    {"$sort": {"_id": 1}}
	]

	cursor = db.clubs.aggregate(pipeline)

	foundation_per_day = [c async for c in cursor]
	
	if len(foundation_per_day) == 0:
		log.critical("No clubs with foundation dates found.")
		exit()

	first_day = foundation_per_day[0]["_id"]
	foundation_per_day = {c["_id"]: c["count"] for c in foundation_per_day}

	start_date = datetime.datetime.strptime(first_day, "%Y-%m-%d").date()
	end_date = datetime.datetime.now().date()
	current_date = start_date
	current_date_str = current_date.strftime("%Y-%m-%d")

	founded_clubs_per_day = {
		(current_date - datetime.timedelta(days=1)).strftime("%Y-%m-%d"): 0
	}

	while current_date <= end_date:
	    founded_clubs_per_day[current_date_str] = \
	    	founded_clubs_per_day[(current_date - datetime.timedelta(days=1)).strftime("%Y-%m-%d")] \
	    	+ (foundation_per_day[current_date_str] if current_date_str in foundation_per_day else 0)
	    current_date += datetime.timedelta(days=1)
	    current_date_str = current_date.strftime("%Y-%m-%d")

	data_points = [{"property": data_property, "date": date, "value": count} 
		for date, count in founded_clubs_per_day.items()]

	await db.data_points.delete_many({"property": "founded_club_count"})
	await db.data_points.insert_many(data_points)
