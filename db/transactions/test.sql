INSERT INTO survey(type, name)
VALUES('highschool', 'testsurvey1')
RETURNING *


-- temp table syntax
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE TEMP TABLE IF NOT EXISTS survey (
  id serial PRIMARY KEY,
  type varchar(50) NOT NULL,
  name varchar(50) NOT NULL,
  count int DEFAULT 0,
  record text[][],
  status int DEFAULT 0,
  created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
