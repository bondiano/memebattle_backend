/*
    Creates table Users.
*/

CREATE TABLE ${schema~}.users
(
    id serial PRIMARY KEY,
    name text NOT NULL
)