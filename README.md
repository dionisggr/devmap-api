# DevMap API
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A simple API for the DevMap App for all HTTP-related requests. The client-side may be found at: https://devmap.vercel.app/.

*(CSS still a Work-In-Progress)*

### API Landing Page:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;https://afternoon-dawn-05389.herokuapp.com/
### Client-Side
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;https://devmap.vercel.app/


### Languages/Tools
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Javascript, Node.js, Express.js, Knex.js, PostgreSQL, Mocha, Chai, Supertest, Nodemon, Postgrator, JSON Web Tokens, Bcrypt, HTML5, CI scripts
Loggers: Morgan, Winston
Securities: XSS, CORS, Helmet

### Deployment Platform:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Heroku

---
### API Request Instructions:

#### Render Landing Page
**URL:** `/`
**Method:** `GET`
**Auth required:** No

#### Success Reponse
**Code:** `200 OK`
**Content example**
*<pre><HTML file></pre>*

---
#### Get Projects
**URL:** `/projects`
**Method:** `GET`
**Auth required:** No

#### Success Reponse
**Code:** `200 OK`
**Content example**
```
[
  {
    "id": "1",
    "name": "Project 1",
    "description": "First description",
    "tools": "HTML/CSS",
    "phase": "Design",
    "status": "Delayed",
    "owner": "username",
    "startDate": "Tue Dec 22 2020 00:00:00 GMT-0700 (Mountain Standard Time)",
    "collaboration": true,
    "github": "github.com/username/project"
  },

  [...]
]
```

---
#### Add Project
**URL:** `/projects`
**Method:** `POST`
**Auth required:** Yes
- `Bearer my-secret-key`
- `Bearer <JSON Web Token>` *(Generated at Login. See below for instructions)

### Request Body
*Requires `headers: {'Content-Type': 'application/json'}`*
```
{
    "name": "Project 1",
    "description": "First description",
    "tools": "HTML/CSS",
    "phase": "Design",
    "status": "Delayed",
    "owner": "username",
    "startDate": "12/22/2020",
    "collaboration": true,
    "github": "github.com/username/project"
  }
```
| Name            | Type    | In     | Description               |
| ----------------| ------- | ------ | ------------------------- |
| `name`          | string  | header | Name of project           |
| `description`   | string  | header | Description of project    |
| `tools`         | string  | header | Languages/Tools required  |
| `phase`         | string  | header | Project Phase             |
| `status`        | string  | header | Project Phase status      |
| `owner`         | string  | header | Creator of project        |
| `startDate`     | string  | header | Date created              |
| `collaboration` | boolean | header | Accepts collaboration     |
| `github`        | string  | header | GitHub project link       |

#### Success Reponse
**Code:** `201 Created`
**Content example**
```
[
  {
    "id": "1",
    "name": "Project 1",
    "description": "First description",
    "tools": "HTML/CSS",
    "phase": "Design",
    "status": "Delayed",
    "owner": "username",
    "startDate": "Tue Dec 22 2020 00:00:00 GMT-0700 (Mountain Standard Time)",
    "collaboration": true,
    "github": "github.com/username/project"
  },

  [...]
]
```

---
#### Edit Project
**URL:** `/projects/:projectID`
**Method:** `PATCH`
**Auth required:** Yes
- `Bearer my-secret-key`
- `Bearer <JSON Web Token>` *(Generated at Login. See below for instructions)

### Request Body
*Requires `headers: {'Content-Type': 'application/json'}`
```
{
    "name": "New Name",
    "description": "New Description",
    "tools": "HTML/CSS",
    "phase": "Design",
    "status": "Delayed",
    "owner": "username",
    "startDate": "12/22/2020",
    "collaboration": true,
    "github": "github.com/username/project"
  }
```
| Name            | Type    | In     | Description               |
| ----------------| ------- | ------ | ------------------------- |
| `projectID`     | integer | path   | Project ID (Primary Key)  |
| `name`          | string  | header | Name of project           |
| `description`   | string  | header | Description of project    |
| `tools`         | string  | header | Languages/Tools required  |
| `phase`         | string  | header | Project Phase             |
| `status`        | string  | header | Project Phase status      |
| `owner`         | string  | header | Creator of project        |
| `startDate`     | string  | header | Date created              |
| `collaboration` | boolean | header | Accepts collaboration     |
| `github`        | string  | header | GitHub project link       |

#### Success Reponse
**Code:** `201 Created` *Resource updated successfully, and refreshes.*
**Content example**
```
[
  {
    "id": "1",
    "name": "New Name",
    "description": "New Description",
    "tools": "HTML/CSS",
    "phase": "Design",
    "status": "Delayed",
    "owner": "username",
    "startDate": "Tue Dec 22 2020 00:00:00 GMT-0700 (Mountain Standard Time)",
    "collaboration": true,
    "github": "github.com/username/project"
  },

  [...]
]
```
### Notes
All values will be necessary in Update due to previous empty field validation

---
#### Delete Project
**URL:** `/projects/:projectID`
**Method:** `DELETE`
**Auth required:** Yes
- `Bearer my-secret-key`
- `Bearer <JSON Web Token>` *(Generated at Login. See below for instructions)

#### Success Reponse
**Code:** `301 Moved Permanently`
**Content example**
*<pre><No Content></pre>*

---
### Local Set-Up
Complete the following steps to clone a local copy of the server:

1. Clone this repository to your local machine `git clone REPO-URL NEW-PROJECT-NAME`
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies `npm install`
5. Move the `example.env` Environment file to `.env`, which will be ignored by git but read by the express server: `mv example.env .env`
6. If you changed the project name, edit the contents of the `package.json` to use NEW-PROJECT-NAME

### Scripts
1. Start a database server with `pg_ctl start`
2. Create an user with Superuser permission, with `createuser -sPE admin` (if different name, make sure to update it in `.env`, `config.js`, `postgrator-config.js` files)
3. Create a database with any name, ideally `devmap` (if different name, make sure to update it in `.env`, `config.js`, `postgrator-config.js` files)
4. Run 'postgrator' with `npm run migrate` to migrate the tables to highest available version
5. Seed the tables with `psql -U admin -d devmap -f ./seeds/seed.devmap.sql` with preset data.
6. Start the application `npm start`; tests will run automatically
7. Alternatively, you may start the application with nodemon `npm run dev`; tests will not run unless manually set to

---
## Landing Page

![Landing Page](https://github.com/dionisggr/devmap-api/blob/main/public/img/landing.png)
