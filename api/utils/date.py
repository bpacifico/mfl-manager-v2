import datetime


def convert_unix_to_datetime(unix):
    return datetime.datetime.fromtimestamp(unix / 1000)
