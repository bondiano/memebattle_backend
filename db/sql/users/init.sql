/*
    Inserting a few demo users into the database, and returning their id-s;
*/

INSERT INTO ${schema~}.users(name) VALUES
('Demo User 1'), -- user 1;
('Demo User 2'), -- user 2;
('Demo User 3'), -- user 3;
('Demo User 4'), -- user 4;
('Demo User 5') -- user 5;
RETURNING id