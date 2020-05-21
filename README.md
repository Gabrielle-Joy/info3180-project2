# Project 2 - Photogram
**Developers**  
* Rowan Atkinson
* Nathaniel Christie
* Gabrielle Higgins
* Rajheem O'Connor

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
be used to do this. Alternatively, use the following commandline instructions in PostgreSQL

```
create user "proj2-user";
create database "info3180-proj2";
\password proj2-user {here we change the password for proj2-user. Set it to "unlocked"}
alter database "info3180-proj2" owner to "proj2-user";
```

## Running Flask-Migrate
Once your database is set up (preferably as above), run these commands

```
python flask-migrate.py db init
python flask-migrate.py db migrate
python flask-migrate.py db upgrade
```

If you wish to update your database model, modify the [models.py](app\models.py) file, then run:

```
python flask-migrate.py db migrate
python flask-migrate.py db upgrade
```

## More info
A description of how the API should work can be found [here](https://photogram.docs.apiary.io/#)

## Heroku app
https://serene-beach-34314.herokuapp.com/