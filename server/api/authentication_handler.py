import json
import os
from flask import jsonify, request, Blueprint
# User is really from models.py, but there's an import loop
# that prevents us from importing it from there.
from app import db, User
from util import scrypt
authentication_handler = Blueprint('authentication_handler', __name__)

@authentication_handler.route('/create', methods=['POST'])
def register_user():
    if request.method == 'POST':
        try:
            body = json.loads(request.get_data())
        except json.JSONDecodeError:
            return jsonify({'error': 'Malformed request data.'}), 400

        name = body.get('name')
        email = body.get('email')
        password = body.get('password')
        if name and email and password:
            if '@' not in email:
                return jsonify({'error': 'Please provide a valid email address.'}), 400
            if len(password) < 6:
                return jsonify({'error': 'Password must be at least 6 characters.'}), 400
            if User.query.filter_by(email=email).count() > 0:
                return jsonify({'error': 'An account already exists for this email address.'}), 400
            
            salt = os.urandom(16)
            hashed_password = scrypt(password, salt)
            new_user = User(name=name, email=email, password=hashed_password, salt=salt)
            db.session.add(new_user)
            db.session.commit()
            return jsonify({
                'id': new_user.id,
                'name': new_user.name,
                'email': new_user.email,
                'JWT': 'fake_signup_JWT',
                }), 201
        else:
            return jsonify({'error': 'Please provide a valid username, email address, and password.'}), 400


# Signing in route /signin
# Verify password and email match. Return 200 is successful. Again, generate a JWT token and return the user & the token to the FE.
@authentication_handler.route('/signin', methods=['POST'])
def login_user():
    if request.method == 'POST':
        try:
            body = json.loads(request.get_data())
        except json.JSONDecodeError:
            return jsonify({'error': 'Malformed request data.'}), 400
        email = body.get('email')
        password = body.get('password')
        if email and password:
            # is 404 really what we want here?
            user_record = User.query.filter_by(email=email).first_or_404("No account exists with that email address")
            hashed_password = scrypt(password, user_record.salt)
            if hashed_password == user_record.password:
                return jsonify({
                    'id': user_record.id,
                    'name': user_record.name,
                    'email': user_record.email,
                    'JWT': 'fake_login_JWT',
                }), 200
            else:
                return jsonify({'error': 'Incorrect password.'})
        else:
            return jsonify({'error': 'Please provide a valid email address and password.'}), 400
