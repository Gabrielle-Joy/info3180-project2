import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SECRET_KEY'] = "this is a scret key"
# app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://proj2-user:unlocked@localhost/info3180-proj2"
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://jcrcdvvolvnzkc:e4c335058dfb5ff226421b092e5ac7fd5ebbb2411fdcbdbf48cbf56203f09129@ec2-54-81-37-115.compute-1.amazonaws.com:5432/dbf8o01ugtvcj9"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # added just to suppress a warning
app.config['UPLOAD_FOLDER'] = './app/static/uploads'

db = SQLAlchemy(app)

app.config.from_object(__name__)

from app import views
