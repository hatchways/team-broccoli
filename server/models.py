from app import db
from sqlalchemy.dialects.postgresql import JSON, BYTEA
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from marshmallow import Schema, fields

# leaving this here against the db import from app;
# still figuring out which approach is best
db = SQLAlchemy()
ma = Marshmallow()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(80), nullable=False, unique=True)
    password = db.Column(BYTEA(64), nullable=False)
    salt = db.Column(BYTEA(16), nullable=False)

    fundraisers = db.relationship("Fundraiser", back_populates="creator")
    donations = db.relationship("Donation", back_populates="user")

class Fundraiser(db.Model):
    __tablename__ = 'fundraisers'

    id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text(), nullable=False)
    amount = db.Column(db.Integer(), nullable=False)
    deadline = db.Column(db.DateTime(), nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False)
    creator_id = db.Column(db.Integer(), db.ForeignKey('users.id'), nullable=False)

    creator = db.relationship("User", back_populates="fundraisers")
    donations = db.relationship("Donation", back_populates="fundraiser")

class Donation(db.Model):
    __tablename__ = 'donations'

    id = db.Column(db.Integer(), primary_key=True)
    amount = db.Column(db.Integer(), nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False)
    fundraiser_id = db.Column(db.Integer(), db.ForeignKey('fundraisers.id'), nullable=False)
    user_id = db.Column(db.Integer(), db.ForeignKey('users.id'), nullable=False)

    fundraiser = db.relationship("Fundraiser", back_populates="donations")
    user = db.relationship("User", back_populates="donations")

class DonationSchema(ma.ModelSchema):
    class Meta:
        model = Donation
        include_fk = True

class FundraiserSchema(ma.ModelSchema):
    class Meta:
        model = Fundraiser
        include_fk = True

    donations = ma.Nested(DonationSchema, many=True)

class UserSchema(ma.ModelSchema):

    class Meta:
        model = User
        load_only = ("password", )
        dump_only = ("id",)
        include_fk = True

    fundraisers = ma.Nested(FundraiserSchema, many=True)
    donations = ma.Nested(DonationSchema, many=True)
