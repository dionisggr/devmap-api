module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_KEY: process.env.API_KEY || 'my-secret-key',
  DB_URL: process.env.DB_URL || 'postgresql://admin@localhost/devmap',
  TEST_DB_URL: process.env.TEST_DB_URL || 'postgresql://admin@localhost/devmap-test'
};