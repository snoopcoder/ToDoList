const pool = require("../controllers/dbconnection");
const crud = {
  create: async task => {
    id = null;
    const text =
      "INSERT INTO tasks(owner,task,priority,iscompleted) VALUES($1, $2,$3,$4) RETURNING *";
    const values = [task.owner, task.task, task.priority, task.iscompleted];
    try {
      const res = await pool.query(text, values);
      id = res.rows[0].id;
      console.log(res.rows[0]);
    } catch (err) {
      console.log(err.stack);
    }

    return id;
  },
  delete: async taskId => {
    id = null;
    const text = "DELETE from tasks Where id=$1 RETURNING *";
    const values = [taskId];
    try {
      const res = await pool.query(text, values);
      id = res.rows[0].id;
      console.log(res.rows[0]);
    } catch (err) {
      console.log(err.stack);
    }

    return id;
  },
  update: async task => {
    //TODO проверить здесь обработку ошибок
    id = null;
    const text =
      "UPDATE  tasks SET task=$1,priority=$2,iscompleted=$3 WHERE id =$4 RETURNING *";
    const values = [task.task, task.priority, task.iscompleted, task.id];
    try {
      const res = await pool.query(text, values);
      id = res.rows[0].id;
      console.log(res.rows[0]);
    } catch (err) {
      console.log(err);
    }

    return id;
  },
  getAll: async prioritySort => {
    //http://127.0.0.1/tasks?sort=priority
    tasks = null;
    const text =
      prioritySort === "priority"
        ? "SELECT tasks.id,tasks.task,tasks.iscompleted,tasks.priority,users.name AS owner FROM tasks LEFT JOIN users ON tasks.owner = users.id order by iscompleted,priority DESC,id DESC"
        : "SELECT tasks.id,tasks.task,tasks.iscompleted,tasks.priority,users.name AS owner FROM tasks LEFT JOIN users ON tasks.owner = users.id order by iscompleted,id DESC";
    const values = [];
    try {
      const res = await pool.query(text, values);
      tasks = res.rows;
      console.log(res.rows[0]);
    } catch (err) {
      console.log(err.stack);
    }
    return tasks;
  },
  getUserBy: async (user_id, prioritySort) => {
    tasks = null;
    //"SELECT * FROM tasks where owner=$1 order by iscompleted,priority"
    const text =
      prioritySort === "priority"
        ? "SELECT tasks.id,tasks.task,tasks.iscompleted,tasks.priority,users.name AS owner FROM tasks LEFT JOIN users ON tasks.owner = users.id where owner=$1 order by iscompleted,priority DESC,id DESC"
        : "SELECT tasks.id,tasks.task,tasks.iscompleted,tasks.priority,users.name AS owner FROM tasks LEFT JOIN users ON tasks.owner = users.id where owner=$1 order by iscompleted,id DESC";
    const values = [user_id];
    try {
      const res = await pool.query(text, values);
      tasks = res.rows;
      console.log(res.rows[0]);
    } catch (err) {
      console.log(err.stack);
    }
    return tasks;
  }
};
module.exports = crud;
