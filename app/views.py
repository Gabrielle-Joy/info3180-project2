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
from app.forms import RegisterForm, LoginForm, PostForm
from app.models import Post, User, Like, Follow
from flask import jsonify, render_template, request, url_for, make_response
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename

###
# Routing for your application.
###

@app.route('/api/users/register', methods=["POST"])
def register():
    form = RegisterForm()
    errors = []
    if form.validate_on_submit() :
        firstname=request.form['first_name']
        lastname=request.form['last_name']
        username=request.form['username']
        user_n=User.query.filter_by(username=username).first()
        if user_n is None:
            password=request.form['password']
            email=request.form['email']
            user_e=User.query.filter_by(email=email).first()
            if user_e is None:
                location = request.form['location']
                biography = request.form['bio']
                f = request.files['profile_picture']
                filename = secure_filename(f.filename)
                f.save(os.path.join(app.config['UPLOAD_FOLDER'],filename))
                new_user = User(first_name=firstname, last_name=lastname, username=username, password=password,
                                email=email, location=location, biography=biography, profile_picture=filename)
                db.session.add(new_user)
                db.session.commit()
                return jsonify({
                    'message':'User successfully registered'
                    })
            else:
                errors.append("Email already in use")
        else:
            errors.append('Username already in use')
    return jsonify({
        'message':'User not created',
        'errors':form_errors(form) + errors
        })

@app.route('/api/auth/login', methods=["POST"])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        user = User.query.filter_by(username=username).first()
        if user is not None and check_password_hash(user.password, password):
            token = jwt.encode({'user_id': user.id, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=45)}, app.config['SECRET_KEY'])
            return jsonify({'user_id': user.id, 'token': token.decode('UTF-8')})
        return make_response({
            'code': -1,
            'message': 'Incorrect Username or Password',
            'errors': []}, 401, {'WWW-Authenticate' : 'Basic realm="Login Required"'})
    else:
        return jsonify({'code': -1, 'message': 'Login Failed', 'errors': form_errors(form)})

@app.route('/api/auth/logout', methods=["GET"])
@auth_required
def logout():
    """As JWT being used to authenticate, true 'logout' occurs when the token expires.
    The client however, should dump the token on logout. Future designs of this project
    could have a blacklist of tokens that once logged out, the system should reject"""
    return jsonify({'message':'User successfully logged out'})

@app.route('/api/users/<int:user_id>', methods=["GET"])
@auth_required
def get_user_details(user_id):
    user = User.query.filter_by(id=user_id).first()

    # confirm user exists
    if user:
        data = {
            'id':user.id, 
            'username': user.username,
            'firstname': user.first_name,
            'lastname': user.last_name,
            'email': user.email,
            'location': user.location,
            'biography': user.biography,
            'profile_photo': user.profile_picture,
            'joined_on': user.date_created,
            'posts': get_post_helper(user_id)
        }
        return jsonify(data)
        
    else:
        return jsonify({'code': -1, 'message': 'User does not exist', 'errors': [] })

@app.route('/api/users/<int:user_id>/posts', methods=["POST"])
@auth_required
def add_post(user_id):
    form = PostForm()
    errors = []

    # gets the user id from the token
    user_id = getUserID()
    user = User.query.filter_by(id=user_id).first()

    if form.validate_on_submit():
        bio = request.form['bio']
        pic = request.files['post_photo']

        # save the uploaded image
        filename = secure_filename(pic.filename)
        pic.save(os.path.join(app.config['UPLOAD_FOLDER'],filename))

        post = Post(user_id, filename, bio)
        db.session.add(post)
        db.session.commit()
        
        return jsonify({'message':'Successfully created a new post'})
    else:
        return jsonify({'code': -1, 'message': 'Post not created', 'errors': form_errors(form)})

@app.route('/api/users/<int:user_id>/posts', methods=["GET"])
@auth_required
def get_post(user_id):
    user = User.query.filter_by(id=user_id).first()

    # Confirm user exists
    if user:
        return jsonify({'posts': get_post_helper(user_id)})
    else:
        return jsonify({'code': -1, 'message': 'User does not exist', 'errors': [] })

def get_post_helper(user_id):
    """Returns a list of dicts of post info for given user_id"""
    lst = []
    posts = Post.query.filter_by(user_id=user_id).all()
    for post in posts:
        lst.append({
            "id": post.id,
            "user_id": post.user_id,
            "photo": post.photo,
            "description": post.caption,
            "created_on": post.created_on
        })
    return lst

@app.route('/api/users/<int:user_id>/follow', methods=["POST"])
@auth_required
def follow_user(user_id):
    data = request.json

    # the person to be followed. Obtaining info from the POST body rather than the route params
    target_id = data["follower_id"] 
    user_id = getUserID()

    tar_user = User.query.get(target_id)

    # ensure the target user exists in the db and that the user isn't trying to follow his/herself
    if tar_user and target_id != user_id:
        
        # check if user is already following target user
        follow = Follow.query.filter_by(user_id=user_id, follower_id=target_id).first()
        if follow == None:
            follow = Follow(user_id, target_id)
            db.session.add(follow)
            db.session.commit()
            return jsonify({"message": "You are now following that user"})
        else:
            return jsonify({'code': -1, "message": "You are already following that user", 'errors': []})
    else:
        return jsonify({'code': -1, 'message': 'Target user does not exit/User cannot follow oneself', 'errors': [] })

def getUserID():
    """Returns the user ID in the JWT token payload"""
    auth = request.headers.get('Authorization', None)
    token = auth.split()[1]
    try:
        payload = jwt.decode(token, app.config['SECRET_KEY'], verify=False)
        return payload["user_id"]
    except:
        return -1

@app.route('/api/users/<int:user_id>/follow', methods=["GET"])
@auth_required
def get_num_followers(user_id):
    user = User.query.get(user_id)

    #check if user exists
    if user:
        num_followers = Follow.query.filter_by(follower_id=user_id).count()
        return jsonify({'followers': num_followers})
    else:
        return jsonify({'code': -1, 'message': 'User does not exist', 'errors': [] })

@app.route('/api/posts', methods=["GET"])
@auth_required
def all_posts():
    data = []
    posts = Post.query.all()

    for post in posts:
        likes = Like.query.filter_by(post_id=post.id).count()
        data.append({
            "id": post.id,
            "user_id": post.user_id,
            "photo": post.photo,
            "caption": post.caption,
            "created_on": post.created_on,
            "likes": likes
        })

    return {'posts': data}

@app.route('/api/posts/<int:post_id>/like', methods=["POST"])
@auth_required
def like_post(post_id):
    data = request.json

    # obtaining the post_id from the POST boy rather than URL params
    post_id = data['post_id']
    user_id = getUserID()

    post = Post.query.get(post_id)

    # ensure the target post exists
    if post:
        # check if the user has already liked the post
        
        like = Like.query.filter_by(user_id=user_id, post_id=post_id).first()
        if like == None:
            print(post)
            like = Like(user_id, post_id)
            db.session.add(like)
            db.session.commit()
            likes = Like.query.filter_by(post_id=post_id).count()
            return jsonify({"message": "Post liked!", "likes": likes})
        else:
            return jsonify({'code': -1, "message": "You already liked this post", 'errors': []})
    else:
        return jsonify({'code': -1, "message": "Post does not exist", 'errors': []})



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
