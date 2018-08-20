let passport = require("koa-passport");
const fs = require("fs");
let Task = require("../models/task");
let User = require("../models/user");

module.exports = require("koa-router")()
  // .get('/user', function*() {
  //     this.body = 'user root'
  // })
  // .get('/user/:id', function*() {
  //     this.body = 'hello user ' + this.params.id
  // })
  // .routes()

  //Неправильный вход в систему
  .get("/oops_login", function(ctx) {
    ctx.type = "html";
    ctx.body = fs.createReadStream("views/oops_login.html");
  })
  //Ошибка при регистрации нового пользователя
  .get("/oops_sigin", function(ctx) {
    ctx.type = "html";
    ctx.body = fs.createReadStream("views/oops_sigin.html");
  })
  //Покажем страницук регистрации
  .get("/sign", function(ctx) {
    ctx.type = "html";
    ctx.body = fs.createReadStream("views/sign.html");
  })
  // Регистрация нового пользователя, если успешно добавлен в базу, то ридирект на главную страницу
  .post(
    "/sign",
    //мидлваре создание нового пользователя
    async function(ctx, next) {
      console.log(ctx.request.body);
      let { username, password } = ctx.request.body;
      let user_id = await User.create(username, password, 2);
      if (!user_id) {
        ctx.redirect("/oops_sigin");
      }
      await next();
    },
    // пользователь создан и сразу его авторизуем по данным из формы

    passport.authenticate("local"), // можно использовать successRedirect но так можно сделать еще что-то полезное в следующем мидлваре
    async function(ctx, next) {
      if (ctx.isAuthenticated()) ctx.redirect("/app");
    }
  )
  //Покажем страницу входа
  .get("/login", function(ctx) {
    if (ctx.isAuthenticated()) {
      ctx.redirect("/app");
    } else {
      ctx.type = "html";
      ctx.body = fs.createReadStream("views/login.html");
    }
  })

  //Вход в систему
  .post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/app",
      failureRedirect: "/oops_login",
      failureFlash: true
    })
  )
  //Выход
  .get("/logout", function(ctx) {
    ctx.logout();
    ctx.redirect("/login");
  })

  //Дальше только раздел для вошедших в систему
  // Require authentication for now
  .use(function(ctx, next) {
    if (ctx.isAuthenticated()) {
      return next();
    } else {
      ctx.redirect("/login");
    }
  })
  //перенаправление индекса на главную страцу
  .get("/", function(ctx) {
    ctx.redirect("/app");
  })
  //Покажем главную страницу
  .get("/app", function(ctx) {
    ctx.type = "html";
    ctx.body = fs.createReadStream("./views/index.html");
  })
  //*********************************************
  //Реализация api
  //только для автороизванных пользователей
  //*********************************************

  //Выдать информацию о пользователе
  .get("/user", async function(ctx) {
    //let task = ctx.request.body;
    //task.owner = 1;
    //let user = await User.create("scode", "test", "1");
    //let user = await Task.getAll(false);

    //!!!!!!!!!!!
    user = {
      name: ctx.req.user.name,
      role: ctx.req.user.role
    };
    // user = {
    //   name: "admin",
    //   role: "admins"
    // };
    ctx.type = "json";
    ctx.body = JSON.stringify(user);
  })

  //Выдать все доступные для пользователя таски
  .get("/tasks", async function(ctx) {
    let { id, role } = ctx.req.user;
    //Данные в зависимости от роли
    let tasks = {};
    if (role === "admins") {
      tasks = await Task.getAll(ctx.request.query.sort);
    } else tasks = await Task.getUserBy(id, ctx.request.query.sort);

    ctx.type = "json";
    ctx.body = JSON.stringify(tasks);
  })

  //Новый таск
  .post("/tasks", async function(ctx) {
    let { id } = ctx.req.user;
    let task = ctx.request.body;
    task.owner = id;
    let taskId = await Task.create(task);
    ctx.type = "json";
    if (taskId) {
      ctx.body = JSON.stringify({ status: "ok" });
    } else {
      ctx.body = JSON.stringify({ status: "error" });
    }
  })

  //Обновить таск
  .put("/task", async function(ctx) {
    let task = ctx.request.body;
    let id = await Task.update(task);
    ctx.type = "json";
    if (id) {
      ctx.body = JSON.stringify({ status: "ok" });
    } else {
      ctx.body = JSON.stringify({ status: "error" });
    }
  })
  //удалить таск
  .delete("/task", async function(ctx) {
    let task = ctx.query.id;
    let status = Task.delete(task);
    ctx.type = "json";
    if (status) {
      ctx.body = JSON.stringify({ status: "ok" });
    } else {
      ctx.body = JSON.stringify({ status: "error" });
    }
  })

  .routes();
