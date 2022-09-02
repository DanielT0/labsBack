const Sequelize = require('sequelize');

const sequelize = require('../database/config');

const ElementoG = sequelize.define('elementoGrupal', {
    id:{
        type: Sequelize.STRING,
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
    cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    observaciones: {
        type: Sequelize.TEXT,
        allowNull: false,
    }
})

module.exports= ElementoG;