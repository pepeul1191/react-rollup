-- migrate:up

CREATE TABLE users (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  user VARCHAR(30),
  password VARCHAR(40) NOT NULL,
  image_url VARCHAR(50) NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL
);

-- migrate:down

DROP TABLE users;