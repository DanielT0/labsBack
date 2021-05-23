const { response } = require('express');  // npm i express
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs'); // npm i bcrypt
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;
    try {
        let usuario = await Usuario.findOne({ email });
        console.log(usuario);
        if (usuario !== null) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese correo',
            });
        }

        usuario = new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        //Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token,
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador"
        })
    }
}

const loginUsuario = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });
        console.log(usuario);
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario no existente',
            });
        }

        //Confirmar passwords
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Contraseña incorrecta",
            })
        }

        //Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token,
        })

    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador"
        })
    }
}

const revalidarToken = async (req, res = response) => {
    const {uid, name} = req
    const token = await generarJWT(req.id, req.name);
    res.json({
        ok: true,
        uid, 
        name,
        token,
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}