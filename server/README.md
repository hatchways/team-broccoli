# Team Broccoli!

## How to set up PostgreSQL to match the .env configuration:
```
$ psql
$ postgresql > create database team_broccoli;
$ postgresql > \q
```

## How to run the server
- Change directory to the /server directory
- `pipenv install` to install the dependencies
- `pipenv run python manage.py db migrate` to migrate and populate the database
- `pipenv run flask run` to run the server
