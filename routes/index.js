const path = require("path");
const cookieParse = require("cookie-parser");
const bcrypt = require("bcrypt");
const back_end = require("../back_end/game_mechanics/main_run");
var salt = bcrypt.genSaltSync(10);
// const passport = require("passport");
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
    console.log("Made it to root");
    if(req.cookies.AuthCookie) {
      res.redirect('/main');
    }
    res.render('login');
  });

  app.post("/", function(req, res) {
    res.clearCookie("AuthCookie");
    res.redirect('/');
  })

  //new user login routes
  app.post("/new_user", function(req, res) {
    res.redirect('/new_user');
  });

  app.get("/new_user", (req, res) => {
    //res.sendFile(path.resolve("public/login2.html"));
    res.render('NewUserLogin');
  });

  //pet/habitat selection routes
  app.post("/selection", async function(req, res) {
    var new_username = req.body.newUserEmail;
    console.log(new_username);
    var new_password = req.body.newPassword; //to be secured using passport with raul's code
    hashPass = bcrypt.hashSync(new_password, salt);
    console.log(new_password);
    //Add new user to database here!
      //add new_username
      //add unhashed new_password to db for now (we will fix it with passport later)
      //generate unique user id with uuid
    console.log("About to create User");
    let user = await back_end.createUser(new_username, hashPass);
    res.cookie("AuthCookie", new_username);
    console.log("Created User: ");
    await back_end.testing_print();
    console.log("New User ID: " + user["_id"]);
    console.log("");
    //here is where we will eventually create a cookie
    res.redirect('/selection');
  });
  app.get("/selection", (req, res) => {
    //res.sendFile(path.resolve("public/selection.html"));
    res.render('phSelect')
  });
  //main page routes
  app.post("/main", async function(req, res) {
    await console.log("Made it to post to main");
    // passport.authenticate('local', { successRedirect: '/main',
    //                                  failureRedirect: '/'
    //                                  })
    var username = req.body.loginEmail;
    //console.log(username);
    var password = req.body.password;
    await console.log("Accessed username and password");
    const hashedPassword = back_end.get_hash(username);
    console.log("hased password");
    bcrypt.compare(password, hashedPassword, function(err, result) {
      if (!result) {
        console.log("wrong password");
        throw "Incorrect Password"; // Change to res.render.fuckoff
      } else {
        console.log("correct password");
        res.cookie("AuthCookie", username);
        res.redirect('/main');
      }
    });

    // console.log(password)

    //Here is were we do user authentication

    //cookie here
    //res.redirect('/main');
  });

  app.get("/main", (req, res) => {
    back_end.main(); //runs the game mechanics script to initialize the instance of the game
    //res.sendFile(path.resolve("public/main.html"));
    res.render('game',{hunger:'width: 50%',thirst:'width: 75%',mental_health:'width: 80%'});
  });
  //main from new user
  app.post("/new_main", async function(req, res) {
    var species = req.body.shape;
    var habitat = req.body.habitat;
    var color = req.body.color; //color being stored as int
    var name = req.body.petName;
    // console.log(species);
    // console.log(habitat);
    // console.log(name);
    // console.log(color);

    await console.log("About to create Pet: ");
    let new_pet = await back_end.createPet(name, species, color, habitat);
    await console.log("Created pet, new DB: ");
    //update database here
    //adopt pet using above variables
    //make current user adopt created pet, get user from cookie then
    await console.log("About to add new pet to user: " + "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310");
    let user = await back_end.addPetToUser("7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310", new_pet["_id"]);
    await console.log("Added pet to user, new DB: ");
    await back_end.testing_print();
    res.redirect('/main');
  });


};

module.exports = constructorMethod;
