from app import sio


@sio.on('user_message')
def receive_message(message):
    pass
