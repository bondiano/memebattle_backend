DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
            id serial PRIMARY KEY,
            username text UNIQUE NOT NULL,
            password text NOT NULL,
            email text UNIQUE NOT NULL,
            email_checked boolean DEFAULT false,
            registred_at timestamp NOT NULL DEFAULT now(),
            token text DEFAULT random()
);

DROP TABLE IF EXISTS profiles CASCADE;
CREATE TABLE profiles(
            id serial PRIMARY KEY,
            coins_count NUMERIC DEFAULT 0,
            avatar text,
            user_id INTEGER UNIQUE NOT NULL REFERENCES users(id)
);

DROP TABLE IF EXISTS game_modes CASCADE;
CREATE TABLE game_modes(
            id serial PRIMARY KEY,
            mode_name text UNIQUE NOT NULL,
            start_at timestamp,
            fiish_at timestamp,
            description text UNIQUE
);

DROP TABLE IF EXISTS game_statistics CASCADE;
CREATE TABLE game_statistics(
            id serial PRIMARY KEY,
            raund  NUMERIC NOT NULL,
            fiish_at timestamp DEFAULT now(),
            winers_json text,
            mode_id INTEGER REFERENCES game_modes(id)
);

DROP TABLE IF EXISTS meme_storage CASCADE;
CREATE TABLE meme_storage(
            id serial PRIMARY KEY,
            image_src text NOT NULL,
            description text,
            added_at timestamp DEFAULT now(),
            likes_count NUMERIC DEFAULT 0,
            reposts_count NUMERIC DEFAULT 0,
            factor NUMERIC DEFAULT 0,
            mode_id INTEGER REFERENCES game_modes(id)
);

INSERT INTO game_modes(mode_name, description) VALUES('Беспрерывный баттл','Мемы, вышедшие на бои, борятся в парах друг с другом, кто же победит решать вам, а если выбранный вами мем победил, вы получите заслуженные монеты!');
