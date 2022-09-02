const Sequelize = require('sequelize');

const sequelize = require('../database/config');

const Proyecto = sequelize.define('proyecto', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    descripcion:{
        type: Sequelize.TEXT,
        allowNull: false,
    },
})

module.exports= Proyecto;