const Pool = require("pg").Pool;

export const pool = new Pool({
  user: "bharg",
  password: "password",
  host: "postgres",
  database: "dev",
  port: "5432",
});
