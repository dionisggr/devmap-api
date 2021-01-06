DROP TYPE IF EXISTS role, phase, status;

CREATE TYPE phase AS ENUM (
  'Planning', 'Design', 'Development', 'Testing', 'Ready'
);

CREATE TYPE status AS ENUM (
  'Pending', 'Delayed', 'In-Progress', 'Help'
);

CREATE TYPE role AS ENUM (
  'User', 'Admin'
);