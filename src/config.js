module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_KEY: process.env.API_KEY || 'my-secret-key',
  JWT_SECRET: process.env.JWT_SECRET || 'my-secret-key',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '10m',
  DATABASE_URL:
    process.env.DATABASE_URL ||
      'postgresql://admin@localhost/devmap',
  TEST_DATABASE_URL: process.env.TEST_DB_URL || 'postgresql://admin@localhost/devmap-test'
};