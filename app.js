const express = require("express");
const bodyParser = require("body-parser");
const cookieParse = require("cookie-parser");
const bcrypt = require("bcrypt");
const path = require("path");
const app = express();
const static = express.static(__dirname + "/public");


const configRoutes = require("./routes");
const exphbs = require("express-handlebars");
app.use(express.static('public'));
app.use(cookieParse());
app.use("/public", static);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
