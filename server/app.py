from flask import Flask, Blueprint
from extensions import (
    cors,
    db,
    jwt,
    ma,
    migrate,
    fr_api,
    sio,
)

from config import Config

def create_app(Config):
    app = Flask(__name__.split('.')[0])
    app.config.from_object(Config)
    # TODO -- delete the below
    from config import Config as cfg_Config; app.config.from_object(cfg_Config)
    # TODO -- delete the above
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = 604800 # set expiry date to a week
    register_extensions(app)
    register_blueprints(app)
    register_resources(app)
    return app

def register_extensions(app):
    cors.init_app(app, resources={r"/*": {"origins": "*"}})
    db.init_app(app)
    jwt.init_app(app)
    ma.init_app(app)
    migrate.init_app(app,db)
    sio.init_app(app, cors_allowed_origins="*")
    return None

def register_blueprints(app):
    # from models import User
    # # authentication_handler imports db from this very file.
    # # Is there a better file structure for this?
    from api.authentication_handler import authentication_handler
    from api.donation import donation_handler
    from api.ping_handler import ping_handler
    from api.home_handler import home_handler

    app.register_blueprint(authentication_handler)
    app.register_blueprint(donation_handler)
    app.register_blueprint(home_handler)
    app.register_blueprint(ping_handler)
    return None

def register_resources(app):
    from resources.Fundraiser import FundraiserCreate, FundraiserList, FundraiserResource
    from resources.Uploads import SignS3

    fr_api.add_resource(FundraiserCreate, '/fundraiser')
    fr_api.add_resource(FundraiserList, '/fundraisers')
    fr_api.add_resource(FundraiserResource, '/fundraiser/<int:fundraiser_id>')
    fr_api.add_resource(SignS3, '/sign_s3')

    # Initialize the flask-restful here instead of at register_extensions
    # because of unknown reasons
    fr_api.init_app(app)
    return None

if __name__ == '__main__':
    app = create_app(Config)

    # importing socketIO methods here as
    # they are registered using decorators
    import socketio_routes

    sio.run(app)
