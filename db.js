const { Pool } = require("pg");
require("dotenv").config();

// const devConfig = {
//   user: process.env.PG_USER,
//   password: process.env.PG_PASSWORD,
//   host: process.env.PG_HOST,
//   database: process.env.PG_DATABASE,
//   port: process.env.PG_PORT,
// };

const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

prodConfig = {
  connectionString: process.env.DATABASE_URL, //heroku addon
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = new Pool(proConfig);

module.exports = pool;
