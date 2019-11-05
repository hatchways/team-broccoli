# Team Broccoli!

## How to set up PostgreSQL to match the .env configuration:

```
# Check your PostgreSQL version
# This is NOT the version on apt-get. Install from homebrew / linuxbrew.
$ psql --version
> psql (PostgreSQL) 11.4


$ psql
$ postgresql > create database team_broccoli;

# Verify that team_broccoli is listed
$ postgresql > \l
                           List of databases
     Name      | Owner | Encoding | Collate | Ctype | Access privileges
---------------+-------+----------+---------+-------+-------------------
 postgres      | rs    | UTF8     | C       | C     |
..
 team_broccoli | rs    | UTF8     | C       | C     |
..

$ postgresql > \q
```

## How to run the server

- Change directory to the /server directory
- `pipenv install` to install the dependencies
- `pipenv run flask db migrate` to prepare the migration steps
- `pipenv run flask db upgrade` to apply the latest migration to your database
- `pipenv run flask run` to run the server
