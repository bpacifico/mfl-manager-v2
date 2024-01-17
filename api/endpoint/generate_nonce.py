import secrets
from fastapi.responses import JSONResponse

def generate_nonce():
    nonce = secrets.token_bytes(32)
    nonce_hex = str(nonce.hex())
    return JSONResponse(content={ "nonce": nonce_hex })