const passport = require("koa-passport");
var md5 = require("md5");
let User = require("../models/user");

//TODO что будет если пользователя нет в базе?

const fetchUser = async username => {
  let user = await User.search(username);
  return user;
};

const fetchUserbyId = async id => {
  let user = await User.get(id);
  return user;
};

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  try {
    //ToDo что если юзера уже удалили, сделать обработку
    const user = await fetchUserbyId(id);
    if (user) done(null, user);
    else
      done("ошибка восстановления сессии", null, {
        message: "User does not exist"
      });
  } catch (err) {
    done(err);
  }
});

const LocalStrategy = require("passport-local").Strategy;
passport.use(
  new LocalStrategy(function(username, password, done) {
    fetchUser(username)
      .then(user => {
        let passTochek = password;
        passTochek = md5(passTochek + user.salt);
        if (passTochek === user.pass) {
          done(null, user);
        } else {
          done(null, false);
        }
      })
      .catch(err => done(err));
  })
);
