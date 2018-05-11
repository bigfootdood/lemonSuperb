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
    res.sendFile(path.resolve("public/login1.html"));
  });

  //new user login routes
  app.post("/new_user", function(req, res) {
    res.redirect('/new_user');
  });
  app.get("/new_user", (req, res) => {
    res.sendFile(path.resolve("public/login2.html"));
  });

  //pet/habitat selection routes
  app.post("/selection", function(req, res) {
    //Add new user here!
    res.redirect('/selection');
  });
  app.get("/selection", (req, res) => {
    res.sendFile(path.resolve("public/selection.html"));
  });

  //main page routes
  app.post("/main", function(req, res) {
    console.log(req.body.fname);
    //Here is were we do user authentication
    res.redirect('/main');
  });
  app.get("/main", (req, res) => {
    back_end.main(); //runs the game mechanics script to initialize the instance of the game
    res.sendFile(path.resolve("public/main.html"));
  });




};

module.exports = constructorMethod;
