import os

TEAM_NAME = os.environ['TEAM_NAME']
APP_URL = os.environ['APP_URL']
STRIPE_API_KEY = os.environ['STRIPE_API_KEY']
STRIPE_WEBHOOK_SECRET = os.environ['STRIPE_WEBHOOK_SECRET']

class Config(object):
    DEBUG = os.environ['DEBUG']
    TESTING = os.environ['TESTING']
    CSRF_ENABLED = os.environ['CSRF_ENABLED']
    CORS_ENABLED = os.environ['CORS_ENABLED']
    SECRET_KEY = os.environ['SECRET_KEY']
    JWT_SECRET_KEY = os.environ['JWT_SECRET_KEY']
    SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']
