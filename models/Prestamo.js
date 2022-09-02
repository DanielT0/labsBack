const Sequelize = require('sequelize');

const sequelize = require('../database/config');

const Prestamo = sequelize.define('prestamo', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    fechaPrestamo: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    fechaDevolucion: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    observaciones: {
        type: Sequelize.TEXT,
    },
})

module.exports = Prestamo;