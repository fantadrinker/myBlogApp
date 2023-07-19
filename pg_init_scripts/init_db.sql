
CREATE TABLE IF NOT EXISTS "comments" (
  id varchar(80) PRIMARY KEY,
  post_id varchar(80) NOT NULL,
  email varchar(80) NOT NULL,
  created_at timestamp NOT NULL,
  text text NOT NULL
);
-- need to think about updating schema
