const { response } = require('express');
const Usuario = require('../models/Usuario');

const getUsuarios = async (req, res = response) => {

    const usuarios = await Usuario.find();
    res.status(201).json({
        ok: true,
        usuarios
    });
}


module.exports = {
    getUsuarios,
}