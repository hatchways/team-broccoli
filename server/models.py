from app import db, ma
from sqlalchemy.dialects.postgresql import JSON, BYTEA
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from marshmallow import Schema, fields

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(80), nullable=False, unique=True)
    password = db.Column(BYTEA(64), nullable=False)
    salt = db.Column(BYTEA(16), nullable=False)

    fundraisers = db.relationship("Fundraiser", back_populates="creator")
    donations = db.relationship("Donation", back_populates="user")

    @classmethod
    def find_by_id(cls, _id: int) -> "User":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_by_email(cls, _email: str) -> "User":
        return cls.query.filter_by(email=_email).first()

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()

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

    @classmethod
    def find_by_id(cls, _id: int) -> "Fundraiser":
        return cls.query.filter_by(id=_id).first()

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()

class Donation(db.Model):
    __tablename__ = 'donations'

    id = db.Column(db.Integer(), primary_key=True)
    amount = db.Column(db.Integer(), nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False)
    fundraiser_id = db.Column(db.Integer(), db.ForeignKey('fundraisers.id'), nullable=False)
    user_id = db.Column(db.Integer(), db.ForeignKey('users.id'), nullable=False)

    fundraiser = db.relationship("Fundraiser", back_populates="donations")
    user = db.relationship("User", back_populates="donations")

class UserOnlySchema(ma.ModelSchema):
    class Meta:
        model = User
        fields = ("name", "id", "email", )

class DonationSchema(ma.ModelSchema):
    class Meta:
        model = Donation
        include_fk = True

class FundraiserSchema(ma.ModelSchema):
    class Meta:
        model = Fundraiser
        include_fk = True

    creator = ma.Nested(UserOnlySchema)
    donations = ma.Nested(DonationSchema, many=True)

class UserSchema(ma.ModelSchema):

    class Meta:
        model = User
        load_only = ("password", )
        dump_only = ("id",)
        include_fk = True

    fundraisers = ma.Nested(FundraiserSchema, many=True)
    donations = ma.Nested(DonationSchema, many=True)
