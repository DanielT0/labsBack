const Sequelize = require('sequelize');

const sequelize = require('../database/config');

const SolicitudPrestamo = sequelize.define('solicitudPrestamo', {
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

module.exports = SolicitudPrestamo;