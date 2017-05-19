module.exports = {
  development: {
    url: 'postgres://postgres:03e8d2a1e04e5133b5e5045ae05bd700@213.58.234.45:5433/UNICER',
    dialect: 'postgres'
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: true
    },
  },
  staging: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: true
    }
  },
  test: {
    url: process.env.DATABASE_URL || 'postgres://postgres:03e8d2a1e04e5133b5e5045ae05bd700@213.58.234.45:5433/UNICER_Test',
    dialect: 'postgres'
  }
};