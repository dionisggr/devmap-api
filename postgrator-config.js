require('dotenv').config();
const { DB_URL, TEST_DB_URL, NODE_ENV } = require('./src/config');

console.log(DB_URL, TEST_DB_URL);

module.exports = {
  'migrationsDirectory': 'migrations',
  'driver': 'pg',
  'connectionString': (NODE_ENV === 'test') ? TEST_DB_URL : DB_URL
};