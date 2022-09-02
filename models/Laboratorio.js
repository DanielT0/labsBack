const Sequelize = require('sequelize');

const sequelize = require('../database/config');

const Laboratorio = sequelize.define('laboratorio', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    descripcion:{
        type: Sequelize.TEXT,
        allowNull: false,
    },
    tipo: {
        type: Sequelize.TEXT,
    }
})

module.exports= Laboratorio;