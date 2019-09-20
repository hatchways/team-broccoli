from app import db
from sqlalchemy.dialects.postgresql import JSON, BYTEA

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(80), nullable=False, unique=True)
    password = db.Column(BYTEA(64), nullable=False)
    salt = db.Column(BYTEA(16), nullable=False)
