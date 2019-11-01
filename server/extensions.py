from flask_cors import CORS
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate
#from flask_socketio import SocketIO

cors = CORS()
db = SQLAlchemy()
jwt = JWTManager()
ma = Marshmallow()
migrate = Migrate()
fr_api = Api()
#sio = SocketIO()
