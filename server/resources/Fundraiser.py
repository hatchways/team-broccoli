from flask import request
from flask_restful import Resource
from flask_jwt_extended import (
    get_jwt_identity,
    jwt_required,
)
from marshmallow import ValidationError

from datetime import datetime as dt
from datetime import timezone as tz

from models import db, ma, Fundraiser, FundraiserSchema, User

INVALID_CREDENTIALS = "You do not have permission to do this action."
FUNDRAISER_EXISTS = "Fundraiser already exists."
FUNDRAISER_NOT_FOUND = "Fundraiser does not exist."
FUNDRAISER_DELETED = "Fundraiser has been deleted."

fundraiser_schema = FundraiserSchema()
fundraiser_list_schema = FundraiserSchema(many=True)

class FundraiserCreate(Resource):
    """ Handle POST for /fundraiser
    Create a Fundraiser object
    User must be logged in to create a Fundraiser
    Parameters:
        "title": str,
        "description": str,
        "deadline": str (ISO Date format (ex: "2019-12-01T00:00:00")),
        "amount": int,
    Autogenerated data:
        "created_at": str (ISO Date format)
        "creator_id": int (from User object)

    Returns a Fundraiser object
    with all the parameter above
    + an autogenerated id for future reference.
    + "creator": object of User data of the creator of this Fundraiser
    + "donations": array of Donation objects related to this Fundraiser
    """

    @classmethod
    @jwt_required
    def post(cls):
        user_email = get_jwt_identity()
        user = User.find_by_email(user_email)

        if not user:
            return {"message": INVALID_CREDENTIALS}, 401

        fundraiser_data = request.get_json()

        deadline_string = fundraiser_data['deadline']
        deadline_utc = dt.fromisoformat(deadline_string)
        deadline_utc = deadline_utc.astimezone(tz=tz.utc).isoformat()
        fundraiser_data['deadline'] = deadline_utc

        # server-side generated data
        fundraiser_data['created_at'] = dt.now(tz=tz.utc).isoformat()
        fundraiser_data['creator_id'] = user.id

        try:
            fundraiser = fundraiser_schema.load(fundraiser_data)
        except ValidationError as err:
            return err.messages, 400

        if fundraiser in user.fundraisers:
            return {"message": FUNDRAISER_EXISTS}, 400

        fundraiser.save_to_db()

        return fundraiser_schema.dump(fundraiser), 200

class FundraiserResource(Resource):
    """ Handle GET/PUT/DELETE for /fundraiser/<fundraiser_id>"""

    @classmethod
    def get(cls, fundraiser_id: int):
        fundraiser = Fundraiser.find_by_id(fundraiser_id)

        if not fundraiser:
            return {"message": FUNDRAISER_NOT_FOUND}, 404

        return fundraiser_schema.dump(fundraiser), 200
