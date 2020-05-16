"""
Flask Documentation:     http://flask.pocoo.org/docs/
Jinja2 Documentation:    http://jinja.pocoo.org/2/documentation/
Werkzeug Documentation:  http://werkzeug.pocoo.org/documentation/
This file creates your application.
"""

import os
import jwt
import datetime
from app import app, db
from app.utils import *
from app.forms import *
from app.models import *
from flask import jsonify, render_template, request, url_for, make_response
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename

###
# Routing for your application.
###

@app.route('/api/users/register', methods=["POST"])
def register():
    pass

@app.route('/api/auth/login', methods=["POST"])
def login():
    # jwt practice - rough idea. Need to accept login, generate token, rollout
    auth = request.json

    if auth and auth["password"] == 'password':
        token = jwt.encode({'user_id': auth["user_id"], 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=45)}, app.config['SECRET_KEY'])
        return jsonify({'token': token.decode('UTF-8')})
    return make_response('Could not verify!', 401, {'WWW-Authenticate' : 'Basic realm="Login Required"'})

@app.route('/api/auth/logout', methods=["GET"])
@auth_required
def logout():
    pass


@app.route('/api/users/<int:user_id>/posts', methods=["POST"])
@auth_required
def add_post(user_id):
    pass

@app.route('/api/users/<int:user_id>/posts', methods=["GET"])
@auth_required
def get_post(user_id):
    pass

@app.route('/api/users/<int:user_id>/follow', methods=["POST"])
@auth_required
def follow_user(user_id):
    data = request.json
    target_id = data['follower_id']
    tar_user = User.query.get(target_id)

    # ensure the target user exists in the db, and the requesting user
    # is verified by the token
    if validateUser(user_id) and user_id == data['user_id']:
        follow = Follow(user_id, target_id)
        db.session.add(follow)
        db.session.commit()
        return jsonify({"message": "You are now following that user"})
    else:
        return jsonify({'code': -1, 'message': 'Invalid request', 'errors': [] })





def validateUser(user_id):
    """Ensures the user_id passed matches the user_id in token. Returns
    true if it matches, false otherwise"""
    auth = request.headers.get('Authorization', None)
    token = auth.split[1]
    try:
        payload = jwt.decode(token, app.config['SECRET_KEY'], verify=False)
        if payload["user_id"] == user_id:
            return True
        else:
            return False
    except:
        return False

@app.route('/api/posts', methods=["GET"])
@auth_required
def all_posts():
    return {'message': 'not too bad champ'}


@app.route('/api/posts/<int:post_id>/like', methods=["POST"])
@auth_required
def like_post(post_id):
    pass

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    """
    Because we use HTML5 history mode in vue-router we need to configure our
    web server to redirect all routes to index.html. Hence the additional route
    "/<path:path".

    Also we will render the initial webpage and then let VueJS take control.
    """
    return app.send_static_file('index.html')

###
# The functions below should be applicable to all Flask apps.
###

@app.route('/<file_name>.txt')
def send_text_file(file_name):
    """Send your static text file."""
    file_dot_text = file_name + '.txt'
    return app.send_static_file(file_dot_text)


@app.after_request
def add_header(response):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also tell the browser not to cache the rendered page. If we wanted
    to we could change max-age to 600 seconds which would be 10 minutes.
    """
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'public, max-age=0'
    return response


@app.errorhandler(404)
def page_not_found(error):
    """Custom 404 page."""
    return render_template('404.html'), 404


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port="8080")
