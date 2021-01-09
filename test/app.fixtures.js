function createUsers() {
  return [
    {
        username: "dionisggr",
        password: "$2a$08$WUu4nEL6HWLtBLpD49LXpeeIy1zAv7r0N7uzyCruhLigPagVTrJvi",
        first_name: "Dionis",
        last_name: "Gonzalez",
        email: "dionisggr@gmail.com",
        tools: "RESTful APIs",
        start_date: "12/22/2020",
        github: "github.com/dionisggr",
    },
    {
        username: "gabrielrrm",
        password: "$2a$08$WUu4nEL6HWLtBLpD49LXpeeIy1zAv7r0N7uzyCruhLigPagVTrJvi",
        first_name: "Gabriel",
        last_name: "Ramirez",
        email: "gabrielrrm@gmail.com",
        tools: "JQuery",
        start_date: "12/22/2020",
        github: "github.com/gabrielrrm",
    },
    {
        username: "manuelprz",
        password: "$2a$08$WUu4nEL6HWLtBLpD49LXpeeIy1zAv7r0N7uzyCruhLigPagVTrJvi",
        first_name: "Manuel",
        last_name: "Perez",
        email: "manuelprz@gmail.com",
        tools: "React",
        start_date: "12/22/2020",
        github: "github.com/manuelprz",
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
      "owner_id": 2,
      "owner": "gabrielrrm",
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
      "owner_id": 2,
      "owner": "gabrielrrm",
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
      "owner_id": 3,
      "owner": "manuelprz",
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
        "project_id": "1",
        "tools": "Bootstrap",
        "phase": "Design",
        "status": "Delayed",
        "start_date": "2020-12-30T20:02:30.908Z",
        "owner_id": "2",
        "owner": "gabrielrrm",
        "collaboration": true,
        "github": "github.com/dionisggr/devmap"
    },
    {
        "name": "Issue 2",
        "description": "Second description",
        "project_id": "2",
        "tools": "Event delegation",
        "phase": "Development",
        "status": "In-Progress",
        "start_date": "2020-12-30T20:02:30.908Z",
        "owner_id": "2",
        "owner": "gabrielrrm",
        "collaboration": true,
        "github": "github.com/manuelprz/devmap"
    },
    {
        "name": "Issue 1",
        "description": "First description",
        "project_id": "3",
        "tools": "Route architecture",
        "phase": "Design",
        "status": "In-Progress",
        "start_date": "2020-12-30T20:02:30.908Z",
        "owner_id": "3",
        "owner": "manuelprz",
        "collaboration": true,
        "github": "github.com/dionisggr/devmap"
    }
  ]
};

module.exports = {
  createUsers,
  createProjects,
  createIssues
};