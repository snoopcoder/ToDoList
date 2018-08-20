const { Pool, Client } = require("pg");
const config = require("config");

const pool = new Pool(config.database.tasklist);

//const res = await pool.query("SELECT NOW()");

module.exports = pool;
