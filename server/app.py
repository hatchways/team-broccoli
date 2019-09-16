from flask import Flask
from flask_sqlalchemy import SQLAlchemy

import os
from dotenv import load_dotenv

from api.ping_handler import ping_handler
from api.home_handler import home_handler
from config import Config

load_dotenv(".env")
app = Flask(__name__)
app.config.from_object(Config)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db = SQLAlchemy(app)
from models import User

app.register_blueprint(home_handler)
app.register_blueprint(ping_handler)
