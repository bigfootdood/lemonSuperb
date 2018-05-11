const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const static = express.static(__dirname + "/public");
// const passport = require("passport");
// const LocalStrategy = require('passport-local').Strategy;
// const database = require("back_end/data");
// const flash=require("connect-flash");



const configRoutes = require("./routes");
const exphbs = require("express-handlebars");
app.use(express.static('public'));
app.use("/public", static);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// passport.use(new LocalStrategy({
//   usernameField: 'loginEmail',
//   passwordField: 'password',
//   // passReqToCallback : true
//   },
//   function(username, password, done) {
//     User.findOne({ userName: username }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
//   }
// ));


configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
