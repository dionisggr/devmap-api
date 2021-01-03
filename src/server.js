const app = require('./app');
const { PORT, DB_URL, TEST_DB_URL, NODE_ENV } = require('./config');
const knex = require('knex');

app.set('db', knex({
  client: 'pg',
  connection: (NODE_ENV==='test') ? TEST_DB_URL : DB_URL
}));

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}.`);
});