const path = require("path");
const cookieParse = require("cookie-parser");
const bcrypt = require("bcrypt");
const back_end = require("../back_end/game_mechanics/main_run");
const data = require("../back_end/database/data");
var salt = bcrypt.genSaltSync(10);


const constructorMethod = app => {

  //main login route
  app.get("/", (req, res) => {
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
    res.render('NewUserLogin');
  });

  //pet/habitat selection routes
  app.post("/selection", async function(req, res) {
    var new_username = req.body.newUserEmail;
    var new_password = req.body.newPassword;
    hashPass = bcrypt.hashSync(new_password, salt);

    let user = await back_end.createUser(new_username, hashPass);
    res.cookie("AuthCookie", new_username);
    await back_end.testing_print();
    res.redirect('/selection');
  });

  app.use("/selection", (req, res, next) => {
    if (!(req.cookies.AuthCookie)){
      res.status(403).send("Stop hacking our site");
    }
    next();
  });

  app.get("/selection", async function (req, res) {
      res.render('phSelect');
  });

  //main page routes
  app.post("/main", async function(req, res) {
    await console.log("Made it to post to main");
    var username = req.body.loginEmail;
    var password = req.body.password;

    await console.log("Accessed username and password");
    const hashedPassword = await back_end.get_hash(username);
    console.log("hased password");
    bcrypt.compare(password, hashedPassword, function(err, result) {
      if (!result) {
        res.render("login", {err: 'Wrong Username or Password'});
      } else {
        res.cookie("AuthCookie", username);
        res.redirect('/main');
      }
    });
  });

  app.use("/main", (req, res, next) => {
    if (!(req.cookies.AuthCookie)){
      res.status(403).send("Stop hacking our site");
    }
    next();
  })
  app.get("/main", async function (req, res) {
    back_end.main(); //runs the game mechanics script to initialize the instance of the game
    //res.sendFile(path.resolve("public/main.html"));
    let username = req.cookies.AuthCookie;
    var user = await data.user.getUser(username);
    let pet = await data.pet.getPetById(user["petId"]);

    let hab = pet["habitat"];
    let hungerStat = pet["hunger"];
    let sickStat = pet["sick"];
    let thirstStat = pet["thirst"];
    let mentalHealth = pet["mentalHealth"];
    let petName = pet["name"];
    let isAlive = pet["alive"];

    if(hab == 0){
      res.render('game',{hunger:'width: '+ hungerStat + '%',thirst:'width: '+ thirstStat + '%',mental_health:'width: '+ mentalHealth + '%', background: '/habitats/forest.json'});
    }
    else if(hab == 1){
      res.render('game',{hunger:'width: '+ hungerStat + '%',thirst:'width: '+ thirstStat + '%',mental_health:'width: '+ mentalHealth + '%', background: '/habitats/snow_forest.json'});
    }
    else{
      res.render('game',{hunger:'width: '+ hungerStat + '%',thirst:'width: '+ thirstStat + '%',mental_health:'width: '+ mentalHealth + '%', background: '/habitats/beach.json'});
    }
  });
  //main from new user
  app.post("/new_main", async function(req, res) {
    var species = req.body.shape;
    var habitat = req.body.habitat;
    var color = req.body.color; //color being stored as int
    var name = req.body.petName;

    await console.log("About to create Pet: ");
    let new_pet = await back_end.createPet(name, species, color, habitat);
    await console.log("Created pet, new DB: ");
    await console.log("THE COOKIE: " + req.cookies.AuthCookie);
    await console.log("About to add new pet to user: " + "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310");
    let userToAdd = await data.user.getUser(req.cookies.AuthCookie);
    let user = await back_end.addPetToUser(userToAdd["_id"],new_pet["_id"]);
    await console.log("Added pet to user, new DB: ");
    await back_end.testing_print();
    res.redirect('/main');
  });

  app.post("/habitat",async function(req,res){
    var hab = req.body.habitat;
    let username = req.cookies.AuthCookie;
    var user = await data.user.getUser(username);
    var pet = await data.pet.getPetById(user["petId"]);
    var habObj = {habitat : hab};

    await data.pet.updateSpecPet(pet["_id"], habObj);
    res.redirect('/main');
  });


};

module.exports = constructorMethod;
