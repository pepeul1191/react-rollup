-- migrate:up

INSERT INTO users (id, user, password, image_url, created_at, updated_at) VALUES (1, 'user1', 'pass1', 'default.png', datetime('now'), datetime('now'));
INSERT INTO users (id, user, password, image_url, created_at, updated_at) VALUES (2, 'user2', 'pass2', 'default.png', datetime('now'), datetime('now'));
INSERT INTO users (id, user, password, image_url, created_at, updated_at) VALUES (3, 'user3', 'pass3', 'default.png', datetime('now'), datetime('now'));
INSERT INTO users (id, user, password, image_url, created_at, updated_at) VALUES (4, 'user4', 'pass4', 'default.png', datetime('now'), datetime('now'));
INSERT INTO users (id, user, password, image_url, created_at, updated_at) VALUES (5, 'user5', 'pass5', 'default.png', datetime('now'), datetime('now'));

-- migrate:down

DELETE FROM users;
UPDATE SQLITE_SEQUENCE SET seq = 0 WHERE name = 'users';