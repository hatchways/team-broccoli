from app import sio

@sio.on('user_message')
def receive_message(message):
    print(message)


#Socket IO Requirements to test the functionality from the FE
#To establish socket io Listener for the connection from the FE Message Component
# Broadcast the received message from the server for the client to receive back the message
