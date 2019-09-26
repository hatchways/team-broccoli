import os

TEAM_NAME = os.environ['TEAM_NAME']

class Config(object):
    DEBUG = os.environ['DEBUG']
    TESTING = os.environ['TESTING']
    CSRF_ENABLED = os.environ['CSRF_ENABLED']
    SECRET_KEY = os.environ['SECRET_KEY']
    JWT_SECRET_KEY = os.environ['JWT_SECRET_KEY']
    SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']
