from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from api.ping_handler import ping_handler
from api.home_handler import home_handler
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db = SQLAlchemy(app)
migrate = Migrate(app,db)
from models import User

app.register_blueprint(home_handler)
app.register_blueprint(ping_handler)
