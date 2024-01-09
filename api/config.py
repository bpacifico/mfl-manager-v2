import os
from dotenv import load_dotenv


load_dotenv()


def _getenv(key, default=None, mandatory=True):
    if mandatory:
        if key in os.environ or default is not None:
            return os.getenv(key, default)
        raise KeyError("environment variable '%s' not set" % key)
    return os.getenv(key, default)


# WEB SERVER

ORIGINS = [
    "http://127.0.0.1",
    "http://127.0.0.1:5000",
]

# DATABASE

MONGO_DB_URL = "mongodb://root:password@127.0.0.1:27017"

DB_CONFIG = {
    'drivername':   _getenv('DB_DRIVER',    default='mysql+pymysql'),
    'host':         _getenv('DB_HOSTNAME',  default='localhost'),
    'port':         _getenv('DB_PORT',      default='3306'),
    'database':     _getenv('DB_NAME',      default='OPENXECO'),
    'username':     _getenv('DB_USERNAME',  default='openxeco'),
    'password':     _getenv('DB_PASSWORD',  default='password'),
    'query':        {'charset': _getenv('DB_CHARSET', default='utf8mb4')},
}

# EMAIL

MAIL_CONFIG = {
	'MAIL_USERNAME': 	_getenv('MAIL_USERNAME',  default='localhost'),
	'MAIL_PASSWORD': 	_getenv('MAIL_PASSWORD',  default=''),
	'MAIL_SERVER': 		_getenv('MAIL_SERVER',    default='localhost'),
	'MAIL_PORT': 		_getenv('MAIL_PORT',  	  default='1025'),
	'MAIL_FROM': 		_getenv('MAIL_FROM',  	  default='test@email.com'),
	'MAIL_STARTTLS': 	False,
	'MAIL_SSL_TLS': 	True,
	'USE_CREDENTIALS': 	True,
	'VALIDATE_CERTS': 	True,
}