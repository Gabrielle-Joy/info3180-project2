from . import db
from datetime import date
from werkzeug.security import generate_password_hash


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    photo = db.Column(db.String(120), nullable=False)
    caption = db.Column(db.String(150))
    created_on = db.Column(db.Date())

    def __init__(self, user_id, photo, caption):
        self.user_id = user_id
        self.photo = photo
        self.caption = caption
        self.created_on = date.today()

    def __repr__(self):
        return '<ID {0}\nUserID {1}\nPhoto {2}>'.format(self.id, self.user_id, self.photo)

class User(db.Model):
    # You can use this to change the table name. The default convention is to use
    # the class name. In this case a class name of User would create a
    # user (singular) table, but if we specify __tablename__ we can change it
    # to `users` (plural) or some other name.
    __tablename__ = 'users'

    class Meta:
        csrf = False

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), nullable=False, unique=True)
    password = db.Column(db.String(200), nullable=False)
    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)
    email = db.Column(db.String(40), unique=True, nullable=False)
    location = db.Column(db.String(40))
    biography = db.Column(db.String(250))
    profile_picture = db.Column(db.String(120), nullable=False) # stores the name of the image file to be rendered
    date_created = db.Column(db.Date())

    def __init__(self, username, password, first_name, last_name, email, location, biography, profile_picture):
        self.username = username
        self.password = generate_password_hash(password, method='pbkdf2:sha256')
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.location = location
        self.biography = biography
        self.profile_picture = profile_picture
        self.date_created = date.today()

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        try:
            return unicode(self.id)  # python 2 support
        except NameError:
            return str(self.id)  # python 3 support

    def __repr__(self):
        return '<ID {0}\nUser {1} {2}>'.format(self.id, self.first_name, self.last_name)

class Like(db.Model):
    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    post_id = db.Column(db.Integer, nullable=False)

    def __init__(self, user_id, post_id):
        self.user_id = user_id
        self.post_id = post_id

    def __repr__(self):
        return '<ID {0}\nUserID {1}\nPostID {2}>'.format(self.id, self.user_id, self.post_id)

class Follow(db.Model):
    __tablename__ = 'follows'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    follower_id = db.Column(db.Integer, nullable=False)

    def __init__(self, user_id, follower_id):
        self.user_id = user_id
        self.follower_id = follower_id

    def __repr__(self):
        return '<ID {0}\nUserID {1}\nFollowerID {2}>'.format(self.id, self.user_id, self.follower_id)
