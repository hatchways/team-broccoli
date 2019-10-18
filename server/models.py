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
    deadline = db.Column(db.DateTime(timezone=True), nullable=False)
    live = db.Column(db.Boolean(), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False)
    last_modified_at = db.Column(db.DateTime(timezone=True), nullable=False)
    creator_id = db.Column(db.Integer(), db.ForeignKey('users.id'), nullable=False)
    image_url = db.Column(db.String(512))

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
    created_at = db.Column(db.DateTime(timezone=True), nullable=False)
    fundraiser_id = db.Column(db.Integer(), db.ForeignKey('fundraisers.id'), nullable=False)
    user_id = db.Column(db.Integer(), db.ForeignKey('users.id'), nullable=False)

    fundraiser = db.relationship("Fundraiser", back_populates="donations")
    user = db.relationship("User", back_populates="donations")

association_table = db.Table('association', db.Model.metadata,
    db.Column('conversation_id', db.Integer, db.ForeignKey('conversations.id')),
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'))
)

class Conversation(db.Model):
    __tablename__ = 'conversations'
    id = db.Column(db.Integer(), primary_key=True)
    participants = db.relationship("User",
                                   secondary=association_table,
                                   backref="conversations")

    @classmethod
    def get(cls, userid1, userid2) -> "Conversation":
        # get a conversation for a pair of users
        # order of userid1 and userid2 does not matter
        user1 = cls.participants.any(User.id == userid1)
        user2 = cls.participants.any(User.id == userid2)

        # there should be only one object for each pair
        conv = Conversation.query.filter(user1).filter(user2).first()

        if not conv:
            return None

        return conv

    @classmethod
    def create(cls, userid1, userid2) -> "Conversation":
        # enforce only to have one conversation object per
        # two user combination

        # return error if Conversation for the user combination exists
        existing_conv = cls.get(userid1, userid2)
        if existing_conv:
            return "Conversation exists!"

        # get list of users
        users = User.query.filter(User.id.in_([userid1, userid2])).all()

        # return error if not exactly 2 users exists from the query
        if len(users) != 2:
            return "User does not exist!"

        # create and save the Conversation
        conv = Conversation(participants=users)
        conv.save_to_db()
        return conv

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()

class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('users.id'), nullable=False)
    conversation_id = db.Column(db.Integer(), db.ForeignKey('conversations.id'), nullable=False)
    body = db.Column(db.Text(), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False)

    user = db.relationship("User", backref="messages")
    conversation = db.relationship("Conversation", backref="messages")

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()


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
