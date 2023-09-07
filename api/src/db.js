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

// Capitalizamos los nombres de los modelos ie: car => Car
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Address, Brand, Cart, CartItem, Moto, Order, OrderItem, Review, Tipo } =
  sequelize.models;

// Aca vendrian las relaciones

Brand.hasMany(Moto);
Moto.belongsTo(Brand);

Tipo.hasMany(Moto);
Moto.belongsTo(Tipo);

Moto.hasMany(CartItem);
CartItem.belongsTo(Moto);

Cart.hasMany(CartItem);
CartItem.belongsTo(Cart);

Cart.hasMany(Order);
Order.belongsTo(Cart);

Moto.hasMany(OrderItem);
OrderItem.belongsTo(Moto);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

Moto.hasMany(Review);
Review.belongsTo(Moto);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importar la conexión { conn } = require('./db.js');
};
