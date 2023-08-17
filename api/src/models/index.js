const fs = require("fs");
const path = require("path");

const models = {};

// Lee todos los archivos en la carpeta "models" excepto el archivo "index.js"
fs.readdirSync(__dirname).forEach((file) => {
  if (file !== "index.js" && file.endsWith(".js")) {
    const fileName = file.replace(".js", "");
    models[fileName] = require(path.join(__dirname, file));
  }
});

module.exports = models;
