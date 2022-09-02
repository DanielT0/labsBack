const Sequelize = require('sequelize');

const sequelize = require('../database/config');

const Elemento = sequelize.define('elemento', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    referencia: {
        type: Sequelize.TEXT,
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    descripcion: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    estado: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    observaciones: {
        type: Sequelize.TEXT,
    }
})

module.exports = Elemento;