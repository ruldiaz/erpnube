require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/erpnube`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Product, Client, Sale, User, SaleProduct, Inventory, Purchase, PurchaseProduct, Supplier } = sequelize.models;

// Aca vendrian las relaciones

// One-to-Many Relationships
Product.belongsToMany(Sale, {through: SaleProduct});
Sale.belongsToMany(Product, {through: SaleProduct});

//Product.hasMany(Sale); // A product can have many sales (ventas)
//Sale.belongsTo(Product); // Each sale (venta) belongs to a product

Client.hasMany(Sale); // A client can have many sales (ventas)
Sale.belongsTo(Client); // Each sale (venta) belongs to a client

Purchase.hasMany(Supplier);
Supplier.belongsTo(Purchase);

// User has many sales (ventas)
User.hasMany(Sale);
Sale.belongsTo(User); // Each sale (venta) belongs to a user

// One-to-Many relationship between Product and Inventory
Product.hasMany(Inventory);  // A product can be in many inventory entries
Inventory.belongsTo(Product);  // Each inventory entry is for one product

//  One to many between User and purchase
User.hasMany(Purchase);
Purchase.belongsTo(User);

// Many to many relationship between Products and Purchases
Product.belongsToMany(Purchase, {through: PurchaseProduct});
Purchase.belongsToMany(Product, {through: PurchaseProduct});


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
