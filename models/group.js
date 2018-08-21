const pool = require("../controllers/dbconnection");
const crud = {
  search: async rolesName => {
    role = null;
    //"SELECT * FROM tasks where owner=$1 order by iscompleted,priority"
    const text = "SELECT * FROM roles where caption=$1";
    const values = [rolesName];
    try {
      const res = await pool.query(text, values);
      role = res.rows[0];
    } catch (err) {
      console.log(err.stack);
    }
    return role;
  }
};
module.exports = crud;
