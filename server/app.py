from flask import Flask, Blueprint
from flask_cors import CORS
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate

from config import Config

app = Flask(__name__.split('.')[0])
app.config.from_object(Config)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = 604800 # set expiry date to a week
cors = CORS(app, resources={r"/*": {"origins": "*"}})

db = SQLAlchemy(app)
jwt = JWTManager(app)
ma = Marshmallow(app)
migrate = Migrate(app,db)

import socketio_routes

from models import User
# authentication_handler imports db from this very file.
# Is there a better file structure for this?
from api.authentication_handler import authentication_handler
from api.ping_handler import ping_handler
from api.home_handler import home_handler

app.register_blueprint(authentication_handler)
app.register_blueprint(home_handler)
app.register_blueprint(ping_handler)

# flask_restful API and resources
from resources.Fundraiser import FundraiserCreate, FundraiserList, FundraiserResource
from resources.Uploads import SignS3
fr_api = Api(app)

fr_api.add_resource(FundraiserCreate, '/fundraiser')
fr_api.add_resource(FundraiserList, '/fundraisers')
fr_api.add_resource(FundraiserResource, '/fundraiser/<int:fundraiser_id>')
fr_api.add_resource(SignS3, '/sign_s3')

if __name__ == '__main__':
    socketio_routes.sio.run(app)
