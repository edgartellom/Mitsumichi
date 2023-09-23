require("dotenv").config();
const { Sequelize } = require("sequelize");
const models = require("./models");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DEPLOY } = process.env;

let sequelize;
DB_DEPLOY
  ? (sequelize = new Sequelize(DB_DEPLOY, {
      logging: false,
      native: false,
    }))
  : (sequelize = new Sequelize(
      `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/mitsumichi`,
      {
        logging: false,
        native: false,
      }
    ));

// Iterar sobre los modelos y pasarles la instancia de Sequelize
Object.values(models).forEach((model) => {
  model(sequelize);
});

// Función para capitalizar la primera letra y la letra después de un guion bajo
function capitalize(str) {
  return str.replace(/(?:^|_)([a-z])/g, (_, char) => char.toUpperCase());
}

// Capitalizar los nombres de los modelos
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map(([modelName, model]) => [
  capitalize(modelName),
  model,
]);

sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Address, Brand, Color, Moto, MotoColor, Review, Tipo } =
  sequelize.models;

// Aca vendrian las relaciones

Brand.hasMany(Moto);
Moto.belongsTo(Brand);

Tipo.hasMany(Moto);
Moto.belongsTo(Tipo);

Moto.hasMany(Review);
Review.belongsTo(Moto);

Moto.belongsToMany(Color, { through: MotoColor });
Color.belongsToMany(Moto, { through: MotoColor });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importar la conexión { conn } = require('./db.js');
};
