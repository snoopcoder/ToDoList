const crypto = require("crypto");
var md5 = require("md5");
const pool = require("../controllers/dbconnection");
const crud = {
  search: async username => {
    let user = {};
    const query = {
      // give the query a unique name
      name: "search-user",
      text:
        "SELECT users.id AS id, users.name AS name, users.pass, users.salt, roles.caption AS role FROM users LEFT JOIN roles ON users.role=roles.id WHERE name = $1",
      values: [username]
    };

    try {
      const res = await pool.query(query);
      user = res.rows[0];
    } catch (err) {
      console.log(err.stack);
    }

    return user ? user : {};
  },
  get: async id => {
    let user = {};
    const query = {
      // give the query a unique name
      name: "fetch-user",
      text:
        "SELECT users.id AS id, users.name AS name, users.pass, users.salt,roles.caption AS role FROM users LEFT JOIN roles ON users.role=roles.id WHERE users.id = $1",
      values: [id]
    };

    try {
      const res = await pool.query(query);
      user = res.rows[0];
    } catch (err) {
      console.log(err.stack);
    }
    return user;
  },
  create: async (name, pass, role) => {
    //pass уже md5 генерим соль, складывем с md5 полученым и делаем md5, полученый md5 ложим в pas и рядом ложим соль
    const salt = crypto.randomBytes(16).toString("hex");
    pass = md5(pass + salt);
    let id = null;
    const query = {
      // give the query a unique name
      name: "create-user",
      text:
        "INSERT INTO users(name, pass,role,salt) VALUES($1, $2,$3,$4) RETURNING *",
      values: [name, pass, role, salt]
    };

    try {
      const res = await pool.query(query);
      id = res.rows[0].id;
    } catch (err) {
      console.log(err.stack);
    }
    return id;
  }
};
module.exports = crud;
