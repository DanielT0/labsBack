const Sequelize = require('sequelize');

const sequelize = require('../database/config');

const Grupo = sequelize.define('grupo', {
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
    foto: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    minimo: {
        type: Sequelize.INTEGER,
        allowNull: false
    }   
})

module.exports= Grupo;