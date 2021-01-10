# DevMap API
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A simple API for the DevMap App for all HTTP-related requests. The client-side may be found at: https://devmap.vercel.app/.

### Languages/Tools
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Javascript, Node.js, Express.js, Knex.js, PostgreSQL, Mocha, Chai, Supertest, Nodemon, Postgrator, JSON Web Tokens, Bcrypt, HTML5, CI scripts
Loggers: Morgan, Winston
Securities: XSS, CORS, Helmet

### Deployment Platform:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Heroku

---
### API Request Instructions:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;https://afternoon-dawn-05389.herokuapp.com/

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
