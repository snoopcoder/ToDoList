const pool = require("../controllers/dbconnection");
const crud = {
  search: async username => {
    let user = {};
    const query = {
      // give the query a unique name
      name: "search-user",
      text:
        "SELECT users.id AS id, users.name AS name, users.pass,roles.caption AS role FROM users LEFT JOIN roles ON users.role=roles.id WHERE name = $1",
      values: [username]
    };

    try {
      const res = await pool.query(query);
      console.log("user.js search", res.rows[0]);
      user = res.rows[0];
      // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
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
        "SELECT users.id AS id, users.name AS name, users.pass,roles.caption AS role FROM users LEFT JOIN roles ON users.role=roles.id WHERE users.id = $1",
      values: [id]
    };

    try {
      const res = await pool.query(query);
      console.log(res.rows[0]);
      user = res.rows[0];
      // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
    } catch (err) {
      console.log(err.stack);
    }
    return user;
  },
  create: async (name, pass, role) => {
    let id = null;
    const query = {
      // give the query a unique name
      name: "create-user",
      text: "INSERT INTO users(name, pass,role) VALUES($1, $2,$3) RETURNING *",
      values: [name, pass, role]
    };

    try {
      const res = await pool.query(query);
      console.log(res.rows[0]);
      id = res.rows[0].id;
      // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
    } catch (err) {
      console.log(err.stack);
    }
    return id;
  }
};
module.exports = crud;
