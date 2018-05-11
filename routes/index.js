const path = require("path");
const back_end = require("../back_end/game_mechanics/main_run");

// var fs = require('fs');
// var fileName = '../public/app.json';
// var file = require(fileName);
//
// file.scene.materials[2].color = 9471;
// fs.writeFile(fileName, JSON.stringify(file, null, 2), function (err) {
//   if (err) return console.log(err);
// });


const constructorMethod = app => {

  //main login route
  app.get("/", (req, res) => {
    //res.sendFile(path.resolve("public/login1.html"));
    res.render('login');
  });

  //new user login routes
  app.post("/new_user", function(req, res) {
    res.redirect('/new_user');
  });
  app.get("/new_user", (req, res) => {
    //res.sendFile(path.resolve("public/login2.html"));
    res.render('NewUserLogin');
  });

  //pet/habitat selection routes
  app.post("/selection", function(req, res) {
    var new_username = req.body.newUserEmail;
    console.log(new_username);
    var new_password = req.body.newPassword; //to be secured using passport with raul's code
    console.log(new_password);
    //Add new user here!
      //add new username
      //add unhash password to db for now (we will fix it with passport later)
      //generate unique user id with uuid
    //add cookie
    res.redirect('/selection');
  });
  app.get("/selection", (req, res) => {
    //res.sendFile(path.resolve("public/selection.html"));
    res.render('phSelect')
  });

  //main page routes
  app.post("/main", function(req, res) {
    var username = req.body.loginEmail;
    console.log(username);
    var password = req.body.password;

    //Here is were we do user authentication

    //cookie here
    res.redirect('/main');
  });
  app.get("/main", (req, res) => {
    back_end.main(); //runs the game mechanics script to initialize the instance of the game
    //res.sendFile(path.resolve("public/main.html"));
    res.render('game');
  });
  //main from new user
  app.post("/new_main", function(req, res) {
    var species;
    var color;
    var habitat;
    //update database here
    //create pet from form
    //species & color & habitat
    res.redirect('/main');
  });
};

module.exports = constructorMethod;
