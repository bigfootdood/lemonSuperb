const express = require("express");
const bodyParser = require("body-parser");
const handbar = require("express-handlebars");
const cookieParse = require("cookie-parser");
const bcrypt = require("bcrypt");
const path = require("path");
const app = express();
const users = require("./users");

var curr_user = "";
app.use(bodyParser.json());
app.use(cookieParse());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => {
  //check if have cookie, if so then route to private, else return login html
  if(req.cookies.AuthCookie){
    res.redirect('/private');
  }
  res.sendFile(path.resolve("login.html"));
})

app.post("/login", (req, res) => {
  const username = req.body.username;
  //check if username is correct, if it is then continue to check the password,
  //if username or password are incorrect send the loginError html
  if(username === ""){
    //redirect to error page
    res.sendFile(path.resolve("loginError.html"))
  }
  else {
    curr_user = username;
    const hashed_password = users.get_hash(username);
    //check if password is right
    bcrypt.compare(req.body.password, hashed_password, function(err, result) {
      if(!result){
          //redirect to error page
          res.sendFile(path.resolve("loginError.html"))
      }
      else {
        // create the cookie to keep user loged in
        res.cookie("AuthCookie", username);
        //send to the private route to determine which html page to respond with
        res.redirect('/private');
      }
    });
  }
});

app.get("/login", (req, res) => {
  //send the login html
  res.sendFile(path.resolve("login.html"));
});

app.get("/logout", (req, res) => {
  //remove the cookie, now the login page will no longer redirect to private
  res.clearCookie("AuthCookie");
  //reset the global user to no one
  curr_user = "";
  //send the logged out html
  res.sendFile(path.resolve("logout.html"));
});


//uses the middleware thingy
app.use("/private", (req, res, next) => {
  //if no cookie exists then send the 403 status (as described in requirments), then redirect to root
  if (!(req.cookies.AuthCookie)) {
    res.status(403).send("Can't do that when not logged in");
    res.redirect("/");
  }
  //this makes the middleware thingy continue to the app.get("/private") route
  next();
});

app.get("/private", (req, res) => {
  //check what user is currently being served and respond with the appropriate html page with information on that user
  if(curr_user == "lemon"){
      res.sendFile(path.resolve("public/content/lemon.html"));
  }
  else if (curr_user == "masterdetective123") {
    res.sendFile(path.resolve("public/content/sherlock.html"));
  }
  else if(curr_user == "theboywholived"){
    res.sendFile(path.resolve("public/content/harrypotter.html"));
  }
  else {
    //if the user is not one of the 3 users known to us then respond with an error (This will never happen in this system)
    res.status(404).send("Could not find user page");
  }
});

app.listen(3000, function() {
    console.log("Your server is now listening on port 3000! Navigate to http://localhost:3000 to access it");

    if (process && process.send) process.send({done: true}); // No idea what this does, but said to put it here in the requirments
});
