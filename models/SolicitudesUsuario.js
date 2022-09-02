const Sequelize = require('sequelize');

const sequelize = require('../database/config');

const SolicitudUsuario = sequelize.define('solicitudUsuario', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    idUsuario: {
        type: Sequelize.INTEGER,
        autoIncrement: false,
        allowNull: false,
        primaryKey: true,
    },
    correo: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    tipo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mensaje:
    {
        type: Sequelize.TEXT,
    }
})

module.exports = SolicitudUsuario;