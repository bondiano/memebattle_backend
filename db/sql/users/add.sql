/*
    Inserts a new user record.
*/
INSERT INTO ${schema~}.users(name)
VALUES($1)
RETURNING *