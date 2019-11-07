from app import sio
from flask import session
from flask_socketio import emit, join_room, leave_room
from flask_jwt_extended import (
    get_jti,
    decode_token,
)

from marshmallow import ValidationError

from datetime import datetime as dt
from datetime import timezone as tz

from models import db, ma, User, ConversationSchema, MessageSchema, Message, Conversation

message_schema = MessageSchema()

@sio.on('user_message')
def receive_message(message):
    print(message)

@sio.on('chat message')
def receive_chat(object):
    #print(object)
    #print(decode_token(object['token']).get('identity'))
    user_email = decode_token(object['token']).get('identity')
    user = User.find_by_email(user_email)

    object['sender_id'] = user.id
    object['created_at'] = dt.now(tz=tz.utc).isoformat()

    object.pop('token')
    object.pop('from')

    print(object)
    conv = Conversation.find_by_id(object['conversation_id'])

    # TODO: show error if user not in participant
    if user not in conv.participants:
        return None

    try:
        message = message_schema.load(object)
        message.save_to_db()
    except ValidationError as err:
        return err.messages


    for user in conv.participants:
        emit('chat message', object, room=user.id)

@sio.on('join_room')
def join_room_func(object):
    print('joining room..')
    print(object)
    user_email = decode_token(object['token']).get('identity')
    user = User.find_by_email(user_email)
    join_room(user.id)
    print(user)

@sio.on('joined', namespace='/chat')
def joined(message):
    room = session.get('room')
    join_room(room)
    emit('status',
         {
             'msg': session.get('name') + ' has entered the room.'
         },
         room=room
         )

@sio.on('text', namespace='/chat')
def text(message):
    room = session.get('room')
    emit('message', {'msg': session.get('name') + ':' + message['msg']}, room=room)

@sio.on('left', namespace='/chat')
def left(message):
    """Sent by clients when they leave a room.
    A status message is broadcast to all people in the room."""
    room = session.get('room')
    leave_room(room)
    emit('status', {'msg': session.get('name') + ' has left the room.'}, room=room)

#Socket IO Requirements to test the functionality from the FE
#To establish socket io Listener for the connection from the FE Message Component
# Broadcast the received message from the server for the client to receive back the message
