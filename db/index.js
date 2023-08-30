'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const { InternalServerError } = require('../utils/app-errors'); // Import the InternalServerError class
const modelsDir = path.resolve(__dirname + '/models'); // Replace with your models directory path

let dbConnector = {
  addSequelizeConnectionToRepo: async (dbRepo, db) => {
    console.log("Initializing database connection with smart school...");

    const database = {};
    const sequelize = new Sequelize(db.database, db.username, db.password, db);

    try {
      console.log("Attempting to authenticate with the database...");

      await sequelize.authenticate();
      console.log("Database authentication successful.");

      console.log("Loading models from directory:", modelsDir);

      fs.readdirSync(modelsDir)
      .filter((file) => {
        return (
          file.indexOf('.') !== 0 &&
          file !== 'index.js' &&
          file.slice(-3) === '.js'
        );
      })
      .forEach((file) => {
        console.log("Loading model file:", file);
        const model = require(path.join(modelsDir, file))(sequelize, Sequelize.DataTypes);
        database[model.name] = model;
      });

      console.log("Associating models...");

      Object.keys(database).forEach((modelName) => {
        console.log('Associating model:', modelName);
        if (database[modelName].associate) {
          console.log("Associating model:", modelName);
          database[modelName].associate(database);
        }
      });

      console.log("Setting up database connection properties...");

      database.sequelize = sequelize;
      database.Sequelize = Sequelize;

      dbRepo[db.database] = database; // Store the database connection in dbRepo using db.database as the key

      console.log("Database connection setup completed.");
      return dbRepo;
    } catch (error) {
      console.error("Error connecting to the database:", error);
      throw new InternalServerError(
        `Database connection failed with key ${db.database}. Error: ${error}`
      );
    }
  },

  addSequelizeConnectionToRepoPromise: (dbRepo, db) => {
    return new Promise((resolve, reject) => {
      dbConnector
        .addSequelizeConnectionToRepo(dbRepo, db)
        .then((updatedDbRepo) => {
          resolve(updatedDbRepo);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

module.exports = dbConnector;
