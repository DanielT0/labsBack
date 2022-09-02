const Sequelize = require('sequelize');

const sequelize = require('../database/config');

const ElementosPrestamo = sequelize.define('elementosPrestamo', {
})

module.exports= ElementosPrestamo;