const Sequelize = require('sequelize');

const sequelize = require('../database/config');

const Categoria = sequelize.define('categoria', {
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
})

module.exports= Categoria;