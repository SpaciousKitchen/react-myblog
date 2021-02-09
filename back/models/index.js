'use strict';
require('dotenv').config();
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.js`)[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
  });
}

db.User = require('./user')(sequelize, Sequelize);
db.FreePost = require('./freepost')(sequelize, Sequelize);
db.FreeComment = require('./freecomment')(sequelize, Sequelize);

db.User.hasMany(db.FreePost);

db.FreePost.belongsTo(db.User);
db.FreePost.hasMany(db.FreeComment);

db.FreeComment.belongsTo(db.User);
db.FreeComment.belongsTo(db.FreePost);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
