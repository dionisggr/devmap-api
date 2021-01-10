const app = require('./app');
const { PORT, DATABASE_URL, TEST_DATABASE_URL, NODE_ENV } = require('./config');
const knex = require('knex');

app.set('db', knex({
  client: 'pg',
  connection: (NODE_ENV==='test') ? TEST_DATABASE_URL : DATABASE_URL
}));

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}.`);
});