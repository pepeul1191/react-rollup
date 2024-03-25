CREATE TABLE IF NOT EXISTS "schema_migrations" (version varchar(128) primary key);
CREATE TABLE users (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  user VARCHAR(30),
  password VARCHAR(40) NOT NULL,
  image_url VARCHAR(50) NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL
);
-- Dbmate schema migrations
INSERT INTO "schema_migrations" (version) VALUES
  ('20240325233532'),
  ('20240325233538');
