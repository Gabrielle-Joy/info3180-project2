# Project 2

Remember to always create a virtual environment and install the packages in your requirements file

```
$ python -m venv venv (you may need to use python3 or python3.5 [on Cloud9] instead)
$ source venv/bin/activate (or .\venv\Scripts\activate on Windows)
$ pip install -r requirements.txt 
$ python run.py
```

---

## Database Setup

**Dev Team:** The database credentials described in the project are as follows:

```
Username: proj2-user
Password: unlocked
Port: localhost
Database Name: info3180-proj2
```

Configure a database on your local system with the above properties. pgAdmin 4 is a GUI that can
be used to do this.

## Running Flask-Migrate
Once your database is set up (preferably as above), run these commands

```
python flask-migrate.py db init
python flask-migrate.py db migrate
python flask-migrate.py db upgrade
```

If you wish to update your database model, modify the models.py file, then run:

```
python flask-migrate.py db migrate
python flask-migrate.py db upgrade
```