from utils.db import upsert_vars

async def main(db):
	await upsert_vars(db,"club_id_list",[])

	return 0