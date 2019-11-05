from flask import request
from flask_restful import Resource
from flask_jwt_extended import (
    get_jwt_identity,
    jwt_required,
    jwt_optional,
)
from marshmallow import ValidationError

from datetime import datetime as dt
from datetime import timezone as tz

from extensions import sio

from models import (
    db,
    ma,
    Message,
    Conversation,
    MessageSchema,
    ConversationSchema,
    User
    )

message_schema = MessageSchema()
conversation_schema = ConversationSchema()

INVALID_CREDENTIALS = "You do not have permission to do this action."

class PostMessage(Resource):
    """ Handle POST for /message
    Create a Message objcet
    User must be logged in to send a message
    Parameters:
        "body": str,
        "recipient_id": int,

    Returns a 201 HTTP object created
    """

    @classmethod
    @jwt_required
    def post(cls):
        user_email = get_jwt_identity()
        user = User.find_by_email(user_email)

        if not user:
            return {"message": INVALID_CREDENTIALS}, 401

        message_data = request.get_json

        message_data['sender_id'] = user.id

        recipient_id = message_data['recipient_id']

        conv = Conversation.get(user.id, recipient_id)

        if not conv:
            conv = Conversation.create(user.id, recipient_id)

        try:
            message = message_schema.load(message_data)
        except ValidationError as err:
            return err.messages, 400

        message.save_to_db()

        # TODO: emit websocket event for listeners to refresh
        sio.emit('message',
                 {'msg': 'new message available'},
                 room=conv.id)

        return message_schema.dump(message), 201

class ConversationResource(Resource):
    """ Handle GET for /messages/<id>
    Requires authentication
    """

    @classmethod
    @jwt_required
    def get(cls, recipient_id: int):
        # TODO: Flesh this out
        user_email = get_jwt_identity()
        user = User.find_by_email(user_email)

        if not user:
            return {"message": INVALID_CREDENTIALS}, 401

        conv = Conversation.get(user.id, recipient_id)

        print(conv)
        # QUESTION: is it ok for GET to create
        # object?
        if conv is None:
            conv = Conversation.create(user.id, recipient_id)

        return conversation_schema.dump(conv), 200
