BEGIN;

TRUNCATE project_tools, user_tools, tools, issues, projects, users RESTART IDENTITY CASCADE;

INSERT INTO users
  (username, password, first_name, last_name, email, start_date, admin, github)
VALUES
  ('admin', '$2y$08$u1cerXhTinrwHWdAbKvrie6XCOOw0PZATkQWM0gHMTz0fgbmPtiOu', 'Admin', 'Masterchiefsensei', 'dioveloper@gmail.com', '12-23-2020', TRUE, 'https://github.com/dionisggr'),
  ('dionisggr', '$2y$08$u1cerXhTinrwHWdAbKvrie6XCOOw0PZATkQWM0gHMTz0fgbmPtiOu', 'Dionis', 'Gonzalez', 'dionisggr@gmail.com', '12-23-2020', FALSE, 'https://github.com/dionisggr'),
  ('guest', '$2y$08$u1cerXhTinrwHWdAbKvrie6XCOOw0PZATkQWM0gHMTz0fgbmPtiOu', 'Guest', 'Vistor', 'visitor@guest.com', '12-23-2020', FALSE, 'https://github.com/dionisggr');

INSERT INTO projects
  (name, description, phase, status, start_date, user_id, github)
VALUES
  ('DevMap App', 'An application for developers to help manage their project health and issues.', 'Production', 'Live', '02-19-2021', 1, 'https://github.com/dionisggr/devmap'),
  ('FlickShare App', 'A movie suggestion app based on user-created lists.', 'Production', 'Live', '02-27-2021', 2, 'https://github.com/dionisggr/flickshare-client'),
  ('Conquer The World', 'A daily goal attempt.', 'Development', 'Help', '12-22-2020', 3, 'https://www.dioveloper.com');

INSERT INTO issues
  (name, description, project_id, phase, status, start_date)
VALUES
  ('Urgent CSS', 'Revamping for project showcasing.', 1, 'Design', 'Delayed', '12-22-2020'),
  ('API refactoring', 'Big changes on database and responses', 1, 'Design', 'In-Progress', '12-23-2020'),
  ('Pinky doesn''t help', 'Tried everything', 3, 'Development', 'Help', '12-22-2020');
  
INSERT INTO tools
  (name)
VALUES
  ('HTML5'),
  ('CSS3'),
  ('Javascript'),
  ('JQuery'),
  ('React'),
  ('Express'),
  ('Node'),
  ('PostgreSQL'),
  ('Knex.js'),
  ('Mocha'),
  ('Chai'),
  ('Supertest'),
  ('Postgrator'),
  ('JWT'),
  ('XSS'),
  ('Heroku'),
  ('Vercel'),
  ('API fetch'),
  ('Luck'),
  ('ACME'),
  ('A miracle');

INSERT INTO user_tools
  (user_id, tool_id)
VALUES
  (1, 1),
  (1, 2),
  (1, 3),
  (1, 4),
  (1, 5),
  (1, 6),
  (1, 7),
  (1, 8),
  (1, 9),
  (1, 10),
  (1, 11),
  (1, 12),
  (1, 13),
  (1, 14),
  (1, 15),
  (1, 16),
  (1, 17),
  (1, 18),
  (2, 1),
  (2, 2),
  (2, 3),
  (2, 4),
  (2, 5),
  (2, 6),
  (2, 7),
  (2, 8),
  (2, 9),
  (2, 10),
  (2, 11),
  (2, 12),
  (2, 13),
  (2, 14),
  (2, 15),
  (2, 16),
  (2, 17),
  (2, 18),
  (3, 19),
  (3, 20),
  (3, 21);

INSERT INTO project_tools
  (project_id, tool_id)
VALUES
  (1, 1),
  (1, 2),
  (1, 3),
  (1, 4),
  (1, 5),
  (1, 6),
  (1, 7),
  (1, 8),
  (1, 9),
  (1, 10),
  (1, 11),
  (1, 12),
  (1, 13),
  (1, 14),
  (1, 15),
  (1, 16),
  (1, 17),
  (1, 18),
  (2, 1),
  (2, 2),
  (2, 3),
  (2, 4),
  (2, 5),
  (2, 6),
  (2, 7),
  (2, 8),
  (2, 9),
  (2, 10),
  (2, 11),
  (2, 12),
  (2, 13),
  (2, 14),
  (2, 15),
  (2, 16),
  (2, 17),
  (2, 18),
  (3, 19),
  (3, 20),
  (3, 21);

COMMIT;