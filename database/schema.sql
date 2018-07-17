DROP DATABASE gathering_db;
CREATE DATABASE gathering_db;

DROP TABLE gatherings;

CREATE TABLE gatherings(
  id SERIAL PRIMARY KEY NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date TEXT NOT NUll,
  time TIME NOT NULL,
  latitude DECIMAL NOT NULL,
  longitude DECIMAL NOT NULL
);


