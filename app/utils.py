"""Contains decorator functions for JWT Authentication"""
import jwt
from functools import wraps
from app import app, db
from flask import request, jsonify, make_response

def auth_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.headers.get('Authorization', None)
        if not auth:
            return jsonify({'code': -1, 'message': 'Authorization header is expected'}), 401

        parts = auth.split()

        if parts[0] != 'Bearer':
            return make_request(-1, 'Authorization header must start with Bearer', httpCode=401)
        elif len(parts) == 1:
            return make_request(-1, 'Token not found', httpCode=401)
        elif len(parts) > 2:
            return make_request(-1, 'Authorization header must be Bearer + \s + token', httpCode=401)

        token = parts[1]

        try:
            payload = jwt.decode(token, app.config['SECRET_KEY'])
        except jwt.ExpiredSignature:
            return make_request(-1, 'Token is expired', httpCode=401)
        except jwt.DecodeError:
            return make_request(-1, 'Token signature is invalid', httpCode=401)
        return f(*args, **kwargs)
    return decorated

def make_request(code, message, data={}, httpCode = 200):
    return jsonify(code=code, message=message, data=data), httpCode

def form_errors(form):
    """Collects and returns a list of form errors"""
    error_messages = []
    for field, errors in form.errors.items():
        for error in errors:
            message = u"Error in the %s field - %s" % (
                getattr(form, field).label.text,
                error
            )
            error_messages.append(message)

    return error_messages