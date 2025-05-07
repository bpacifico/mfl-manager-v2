import datetime
import requests
import logging
from utils.db import build_and_upsert_competition
from utils.date import convert_unix_to_datetime


base_url = "https://z519wdyajg.execute-api.us-east-1.amazonaws.com/prod/competitions?upcoming=true"

logger = logging.getLogger("collect_competitions")
logger.setLevel(logging.INFO)


async def main(db):
    logger.critical("competitions fetch")
    response = requests.get(
        url=base_url
    )

    if response.status_code == 200:
        competitions = response.json()

        if len(competitions) > 0:
            for c in competitions:
                competition = await build_and_upsert_competition(db, c)

    return 0