const path = require("path");
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

};

module.exports = constructorMethod;
