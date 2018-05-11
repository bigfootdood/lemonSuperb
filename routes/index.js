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
  app.get("/", (req, res) => {
    res.sendFile(path.resolve("public/login1.html"));
    //res.render('default');
  });
  app.get("/main", (req, res) => {
    back_end.script.run_main();
    res.sendFile(path.resolve("public/main.html"));
  });
};

module.exports = constructorMethod;
