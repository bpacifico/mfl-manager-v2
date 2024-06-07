import datetime
import logging

logger = logging.getLogger("compute_club_count_per_day")
logger.setLevel(logging.INFO)

player_sale_total_per_h_property = "player_sale_total_per_hour"
player_sale_total_per_d_property = "player_sale_total_per_day"
player_sale_total_per_w_property = "player_sale_total_per_week"
player_sale_total_per_m_property = "player_sale_total_per_month"

club_sale_total_per_h_property = "club_sale_total_per_hour"
club_sale_total_per_d_property = "club_sale_total_per_day"
club_sale_total_per_w_property = "club_sale_total_per_week"
club_sale_total_per_m_property = "club_sale_total_per_month"

sale_total_per_h_property = "sale_total_per_hour"
sale_total_per_d_property = "sale_total_per_day"
sale_total_per_w_property = "sale_total_per_week"
sale_total_per_m_property = "sale_total_per_month"


async def main(db):

	pipeline = [
	    {"$match": {"status": "FOUNDED"}},
	    {"$group": {"_id": {"$dateToString": {"format": "%Y-%m-%d", "date": "$date"}}, "count": {"$sum": 1}}},
	    {"$sort": {"_id": 1}}
	]

	db.clubs.aggregate(pipeline)

	data_points = [{"property": data_property, "date": date, "value": count} 
		for date, count in founded_clubs_per_day.items()]

	await db.data_points.delete_many({"property": "founded_club_count"})
	await db.data_points.insert_many(data_points)


def _insert_and_replace_data_points(pipeline, property, data_points):
	foundation_per_day = [c async for c in db.sales.aggregate(pipeline)]

	data_points = [{"property": property, "date": date, "value": count} 
		for date, count in founded_clubs_per_day.items()]

	await db.data_points.delete_many({"property": property})
	await db.data_points.insert_many(data_points)


def _get_time_unit_group_id(time_unit):
	group_id = None

	if time_unit == "h":
        group_id = {
            "date": {"$dateToString": {"format": "%Y-%m-%d %H", "date": {"$toDate": "$execution_date"}}}
        }
    elif time_unit == "d":
        group_id = {
            "day": {"$dateToString": {"format": "%Y-%m-%d", "date": {"$toDate": "$execution_date"}}}
        }
    elif time_unit == "w":
        group_id = {
            "year": {"$isoWeekYear": {"$toDate": "$execution_date"}},
            "week": {"$isoWeek": {"$toDate": "$execution_date"}}
        }
    elif time_unit == "m":
        group_id = {
            "month": {"$dateToString": {"format": "%Y-%m", "date": {"$toDate": "$execution_date"}}}
        }
    else:
        raise ValueError("Invalid time unit. Choose 'h', 'd', 'w', or 'm'.")

    return group_id
