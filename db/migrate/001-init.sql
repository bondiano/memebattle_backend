DROP TABLE IF EXISTS users;
CREATE TABLE users(
            id serial PRIMARY KEY,
            username text UNIQUE NOT NULL,
            password text NOT NULL,
            email text UNIQUE NOT NULL,
            email_checked boolean DEFAULT false,
            registred_at timestamp NOT NULL DEFAULT now(),
            token text DEFAULT random(),
            profile_id serial UNIQUE NOT NULL
);

DROP TABLE IF EXISTS profiles;
CREATE TABLE profiles(
            id serial PRIMARY KEY REFERENCES profiles(id),
            coins_count NUMERIC DEFAULT 0,
            avatar text
);

DROP TABLE IF EXISTS game_modes;
CREATE TABLE game_modes(
            id serial PRIMARY KEY,
            mode_name text UNIQUE NOT NULL,
            start_at timestamp,
            fiish_at timestamp,
            description text UNIQUE,
            statistic_id serial UNIQUE NOT NULL
);

