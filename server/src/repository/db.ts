const Pool = require("pg").Pool;

export const pool = new Pool({
  user: "bharg",
  password: "password",
  host: "postgres",
  database: "dev",
  port: "5432",
});

// To access db locally: psql -h localhost -p 5432 -U bharg -d dev
