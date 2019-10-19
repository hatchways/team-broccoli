from flask_socketio import SocketIO
from app import app


sio = SocketIO(app, cors_allowed_origins="*")

@sio.on('user_message')
def receive_message(message):
    app.logger.critical(message)
