from app import sio
from flask import session
from flask_socketio import emit, join_room, leave_room

@sio.on('user_message')
def receive_message(message):
    print(message)

@sio.on('join_room')
def join_room(id):
    print(id)

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
