from config import HOST


def get_webapp_url():
    if "localhost" in HOST or "127.0.0.1" in HOST:
        return "http://127.0.0.1:3000/"

    return HOST.replace("api.", "")
