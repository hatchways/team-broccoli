from flask import request
from flask_restful import Resource
from flask_jwt_extended import (
    get_jwt_identity,
    jwt_required,
)
from marshmallow import ValidationError
import boto3
import os
import random

from datetime import datetime as dt
from datetime import timezone as tz

from models import User

S3_BUCKET = os.environ.get('S3_BUCKET')

INVALID_CREDENTIALS = "You do not have permission to do this action."

def random_string(length):
    string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    return ''.join([random.choice(string) for n in range(length)])

class SignS3(Resource):
    """ Sign policy string for S3 Uploads

    GET with params:
    - file_name: file name in string
    - file_type: file type in string
    and Authorization Bearer Token from a logged in user

    Returns:
    {
        "data": {
            "url": url of S3 Bucket
            "fields": {
                "acl": access content policy
                "Content-Type": content type
                "key": file name, appended with random string
                "AWSAccessKeyId": public access key to bucket (AWS_ACCESS_KEY_ID)
                "policy": encoded policy
                "signature": signature signed with AWS_SECRET_ACCESS_KEY
            }
        },
        "url": url to POST the image file to
    }
    """

    @classmethod
    @jwt_required
    def get(cls):
        user_email = get_jwt_identity()
        user = User.find_by_email(user_email)

        if not user:
            return {"message": INVALID_CREDENTIALS}, 401


        file_name = request.args.get('file_name')
        file_type = request.args.get('file_type')

        *file_name, extension = file_name.split('.')
        file_name = '.'.join(file_name)
        file_name = file_name + '_' + random_string(8) + '.' + extension

        s3 = boto3.client('s3')

        presigned_post = s3.generate_presigned_post(
            Bucket = S3_BUCKET,
            Key = file_name,
            Fields = {"acl": "public-read", "Content-Type": "image/*"},
            Conditions = [
                {"acl": "public-read"},
                {"Content-Type": "image/*"},
            ],
            ExpiresIn = 3600,
        )

        return {
            "data": presigned_post,
            "url": f"https://{S3_BUCKET}.s3.amazonaws.com/{file_name}"
        }
