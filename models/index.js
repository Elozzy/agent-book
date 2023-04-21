"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize").Sequelize;
const basename = path.basename(__filename);
const db = {};

let sequelize;

sequelize = new Sequelize(
  "agent_book_db",
  "root",
  "guess",
  {
    host: "127.0.0.1",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
    // logging: false
  }
);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
