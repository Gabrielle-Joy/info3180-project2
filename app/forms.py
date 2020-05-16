from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SelectField, TextAreaField
from wtforms.fields.html5 import EmailField
from wtforms.validators import InputRequired, Length, Email, DataRequired
from flask_wtf.file import FileField, FileRequired, FileField, FileAllowed
from werkzeug.utils import secure_filename


class RegisterForm(FlaskForm):
    username = StringField('username', validators=[InputRequired(), Length(max=30)])
    first_name = StringField('fname', validators=[InputRequired(), Length(max=30)])
    last_name = StringField('lname', validators=[InputRequired(), Length(max=30)])
    password = PasswordField('password', validators=[InputRequired()])
    email = EmailField('email', validators=[Email(), InputRequired(), Length(max=40)])
    location = StringField('location', validators=[InputRequired(), Length(max=40)])
    bio = TextAreaField('bio', validators=[DataRequired(), Length(max=250)])
    profile_picture = FileField('photo', validators=[FileRequired(), FileAllowed(['jpg','png'], 'Images only!')])

class LoginForm(FlaskForm):
    username = StringField('username', validators=[InputRequired()])
    password = PasswordField('password', validators=[InputRequired()])

class PostForm(FlaskForm):
    post_photo = FileField('photo', validators=[FileRequired(), FileAllowed(['jpg','png'], 'Images only!')])
    bio = TextAreaField('bio', validators=[Length(max=150)])

