from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SECRET_KEY'] = "the best com-sci gods MAX POWAH"
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://proj2-user:unlocked@localhost/info3180-proj2"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True # added just to suppress a warning
app.config['UPLOAD_FOLDER'] = './app/static/images'

db = SQLAlchemy(app)

app.config.from_object(__name__)
from app import views