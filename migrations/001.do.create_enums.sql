DROP TYPE IF EXISTS role, phase, status;

CREATE TYPE phase AS ENUM (
  'Planning', 'Design', 'Development', 'Testing', 'Production'
);

CREATE TYPE status AS ENUM (
  'Pending', 'Delayed', 'In-Progress', 'Live', 'Help'
);