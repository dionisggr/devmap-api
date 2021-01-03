function createUsers() {
  return [
    {
        username: "dionisggr",
        first_name: "Dionis",
        last_name: "Gonzalez",
        email: "dionisggr@gmail.com",
        tools: "RESTful APIs",
        start_date: "12/22/2020",
        github: "github.com/dionisggr",
        logged: false
    },
    {
        username: "gabrielrrm",
        first_name: "Gabriel",
        last_name: "Ramirez",
        email: "gabrielrrm@gmail.com",
        tools: "JQuery",
        start_date: "12/22/2020",
        github: "github.com/gabrielrrm",
        logged: false
    },
    {
        username: "manuelprz",
        first_name: "Manuel",
        last_name: "Perez",
        email: "manuelprz@gmail.com",
        tools: "React",
        start_date: "12/22/2020",
        github: "github.com/manuelprz",
        logged: false
    }
  ];
};

function createProjects() {
return [
  {
      "name": "Project 1",
      "description": "First description",
      "tools": "HTML/CSS",
      "phase": "Design",
      "status": "Delayed",
      "owner": 1,
      "start_date": "2020-12-30T20:02:30.908Z",
      "collaboration": true,
      "github": "github.com/dionisggr/devmap"
  },
  {
      "name": "Project 2",
      "description": "Second description ",
      "tools": "JQuery",
      "phase": "Development",
      "status": "In-Progress",
      "owner": 2,
      "start_date": "2020-12-30T20:02:30.908Z",
      "collaboration": true,
      "github": "github.com/manuelprz/devmap"
  },
  {
      "name": "Project 3",
      "description": "Third description",
      "tools": "Express.js",
      "phase": "Planning",
      "status": "In-Progress",
      "owner": 3,
      "start_date": "2020-12-30T20:02:30.908Z",
      "collaboration": true,
      "github": "github.com/gabrielrrm/devmap"
  }
]
};

function createIssues() {
  return [
    {
        "name": "Issue 1",
        "description": "First description",
        "tools": "Bootstrap",
        "phase": "Design",
        "status": "Delayed",
        "owner": "1",
        "collaboration": true,
        "github": "github.com/dionisggr/devmap",
        "project_id": "1",
        "start_date": "2020-12-30T20:02:30.908Z"
    },
    {
        "name": "Issue 2",
        "description": "Second description",
        "tools": "Event delegation",
        "phase": "Development",
        "status": "In-Progress",
        "owner": "2",
        "collaboration": true,
        "github": "github.com/manuelprz/devmap",
        "project_id": "2",
        "start_date": "2020-12-30T20:02:30.908Z"
    },
    {
        "name": "Issue 1",
        "description": "First description",
        "tools": "Route architecture",
        "phase": "Design",
        "status": "In-Progress",
        "owner": "3",
        "collaboration": true,
        "github": "github.com/dionisggr/devmap",
        "project_id": "3",
        "start_date": "2020-12-30T20:02:30.908Z"
    }
  ]
};

module.exports = {
  createUsers,
  createProjects,
  createIssues
};