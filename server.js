const Koa = require("koa");
const cors = require("@koa/cors");
var config = require("config");
const DB = require("./controllers/dbconnection");
const app = new Koa();
const serve = require("koa-static-server");
const passport = require("koa-passport");
const session = require("koa-session");

var bodyParser = require("koa-body");

//Set up body parsing middleware
app.use(
  bodyParser({
    multipart: true,
    urlencoded: true
  })
);

app.use(cors());

app.keys = ["testingtask"];
app.use(session({}, app));

// authentication
require("./controllers/auth");
app.use(passport.initialize());
app.use(passport.session());

app.on("error", (err, ctx) => {
  console.log("ОШибка в программе", err);
});
//Статика
app.use(
  serve({
    rootDir: __dirname + "/views/public",
    rootPath: "/public",
    notFoundFile: "index.html"
  })
);
//Загружаем маршруты
app.use(require("./middleware/routes"));

//Обработка ошибок
app.use(async (ctx, next) => {
  //will NOT log the error and will return `Error Message` as the response body with status 400
  try {
    await next();
  } catch (err) {
    // will only respond with JSON
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      message: err.message
    };
  }
});

// start server
const port = 80; //process.env.PORT || 3000;
app.listen(port, () => console.log("Server listening on", port));
