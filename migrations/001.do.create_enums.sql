DROP TYPE IF EXISTS phase, status;

CREATE TYPE phase AS ENUM (
  'Planning', 'Design', 'Development', 'Testing', 'Ready'
);

CREATE TYPE status AS ENUM (
  'Pending', 'Delayed', 'In-Progress', 'Help'
);