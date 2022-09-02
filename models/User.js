const Sequelize = require('sequelize');

const sequelize = require('../database/config');

const Usuario = sequelize.define('usuario', {
    id:{
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
    password:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})

module.exports= Usuario;