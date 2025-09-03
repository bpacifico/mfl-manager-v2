from datetime import datetime
import logging

logger = logging.getLogger("snapshot_clubs")
logger.setLevel(logging.INFO)

async def main(db):
    now = datetime.utcnow()
    clubs = await db.clubs.find({}).to_list(length=None)

    logger.critical("snapshot_clubs starting...")

    for club in clubs:
        snapshot = {
            "date": now,
            "B11": club.get("B11", 0),
            "B16A": club.get("B16A", 0),
            "IG11": club.get("IG11", 0),
            "MMR": club.get("MMR", 0),
            "playerNb": club.get("playerNb", 0)
        }

        await db.clubs.update_one(
            {"_id": club["_id"]},
            {"$push": {"history": snapshot}}
        )

    logger.critical(f"[{now.isoformat()}] Snapshot effectué pour {len(clubs)} clubs. push onctionne?  ")

    return 0
