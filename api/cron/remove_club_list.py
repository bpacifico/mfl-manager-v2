from utils.db import upsert_vars

async def main(db):
	upsert_vars(db,"club_id_list",[])

	return 0