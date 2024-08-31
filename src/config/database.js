import pg from "pg";

// Establisihing Pool Connection to PostgreSQL
const db = new pg.Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT,
});

db.connect();

console.log(db.options);
export default db;
