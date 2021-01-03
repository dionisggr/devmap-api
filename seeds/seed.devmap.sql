TRUNCATE project_collaborators, issues, projects, users RESTART IDENTITY CASCADE;

INSERT INTO users
  (username, first_name, last_name, email, tools, start_date, github, logged)
VALUES
  ('dionisggr', 'Dionis', 'Gonzalez', 'dionisggr@gmail.com', 'RESTful APIs', '12/23/2020', 'github.com/dionisggr', FALSE),
  ('gabrielrrm', 'Gabriel', 'Ramirez', 'gabrielrrm@gmail.com', 'JQuery', '12/23/2020', 'github.com/gabrielrrm', FALSE),
  ('manuelprz', 'Manuel', 'Perez', 'manuelprz@gmail.com', 'React', '12/23/2020', 'github.com/manuelprz', FALSE);

INSERT INTO projects
  (name, description, tools, phase, status, start_date, owner, collaboration, github)
VALUES
  ('Project 1', 'First description', 'HTML/CSS', 'Design', 'Delayed', '12/22/2020', '001', 'Yes', 'github.com/dionisggr/devmap'),
  ('Project 2', 'Second description ', 'JQuery', 'Development', 'In-Progress', '12/22/2020', '002', 'Yes', 'github.com/manuelprz/devmap'),
  ('Project 3', 'Third description', 'Express.js', 'Planning', 'In-Progress', '12/22/2020', '003', 'Yes', 'github.com/gabrielrrm/devmap');

INSERT INTO issues
  (name, description, project_id, tools, phase, status, start_date, owner, collaboration, github)
VALUES
  ('Issue 1', 'First description', '001', 'Bootstrap', 'Design', 'Delayed', '12/22/2020', '001', 'Yes', 'github.com/dionisggr/devmap'),
  ('Issue 2', 'Second description', '002', 'Event delegation', 'Development', 'In-Progress', '12/22/2020', '002', 'Yes', 'github.com/manuelprz/devmap'),
  ('Issue 1', 'First description', '003', 'Route architecture', 'Design', 'In-Progress', '12/22/2020', '003', 'Yes', 'github.com/dionisggr/devmap');

INSERT INTO project_collaborators
  (project_id, user_id)
VALUES
  ('002', '001'),
  ('002', '003'),
  ('003', '001');