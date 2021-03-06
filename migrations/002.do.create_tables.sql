CREATE TABLE IF NOT EXISTS users (
  user_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  start_date TIMESTAMP DEFAULT now(),
  admin BOOLEAN DEFAULT FALSE,
  github TEXT
);

CREATE TABLE IF NOT EXISTS projects (
  project_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  name TEXT NOT NULL,
  description TEXT,
  phase phase NOT NULL,
  status status NOT NULL,
  start_date TIMESTAMP DEFAULT now(),
  github TEXT,
  user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS issues (
  issue_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  name TEXT NOT NULL,
  description TEXT,
  phase phase NOT NULL,
  status status NOT NULL,
  start_date TIMESTAMP DEFAULT now(),
  github TEXT,
  project_id INTEGER REFERENCES projects(project_id) ON DELETE CASCADE ON UPDATE CASCADE,
  user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS tools (
  tool_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS user_tools (
  tool_id INTEGER REFERENCES tools(tool_id) ON DELETE CASCADE ON UPDATE CASCADE,
  user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
  top_skill BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS project_tools (
  tool_id INTEGER REFERENCES tools(tool_id) ON DELETE CASCADE ON UPDATE CASCADE,
  project_id INTEGER REFERENCES projects(project_id) ON DELETE CASCADE ON UPDATE CASCADE
);