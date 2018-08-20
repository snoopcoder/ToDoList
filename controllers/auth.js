const passport = require("koa-passport");
let User = require("../models/user");

const users = [
  { id: 1, username: "test", password: "test", role: "user" },
  { id: 2, username: "user", password: "test", role: "user" },
  { id: 4, username: "admin", password: "test", role: "admin" }
];

// const fetchUser = (() => {
//   // This is an example! Use password hashing in your project and avoid storing passwords in your code
//   const user = { id: 1, username: "test", password: "test" };
//   return async function() {
//     return user;
//   };
// })();

const fetchUser = async username => {
  let user = await User.search(username);
  // for (let item of users) {
  //   if (item.username === username) {
  //     user = item;
  //     break;
  //   }
  // }
  return user;
};

const fetchUserbyId = async id => {
  let user = await User.get(id);
  // for (let item of users) {
  //   if (item.id === id) {
  //     user = item;
  //     break;
  //   }
  // }
  return user;
};

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  try {
    //ToDo что если юзера уже удалили, сделать обработку
    const user = await fetchUserbyId(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const LocalStrategy = require("passport-local").Strategy;
passport.use(
  new LocalStrategy(function(username, password, done) {
    fetchUser(username)
      .then(user => {
        if (username === user.name && password === user.pass) {
          done(null, user);
        } else {
          done(null, false);
        }
      })
      .catch(err => done(err));
  })
);
