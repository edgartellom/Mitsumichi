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
const {
  Address,
  Brand,
  Cart,
  CartItem,
  Moto,
  MotoModel,
  Order,
  OrderItem,
  Review,
  User,
} = sequelize.models;

// Aca vendrian las relaciones
MotoModel.hasMany(Moto);
Moto.belongsTo(MotoModel);

Brand.hasMany(Moto);
Moto.belongsTo(Brand);

Brand.hasMany(MotoModel);
MotoModel.belongsTo(Brand);

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

User.hasOne(Cart);
Cart.belongsTo(User);

User.hasMany(Review);
Review.belongsTo(User);

Moto.hasMany(Review);
Review.belongsTo(Moto);

User.hasMany(Address);
Address.belongsTo(User);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importar la conexión { conn } = require('./db.js');
};
