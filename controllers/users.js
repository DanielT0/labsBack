const bcrypt = require('bcryptjs/dist/bcrypt');
const { response } = require('express');
const Laboratorio = require('../models/Laboratorio');
const Usuario = require('../models/User');

const getUsuarios = async (req, res = response) => {
    const usuarios = await Usuario.findAll();
    res.status(201).json({
        ok: true,
        usuarios
    });
}

const aceptarAdminLaboratorio = async(req, res=response)=>{
    const { uid, lid } = req.body;
    try {
        let usuario = await Usuario.findByPk(uid);
        if (usuario == null) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario con ese id',
            })
        }
        let laboratorio = await Laboratorio.findByPk(lid);
        if (laboratorio ==null) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un laboratorio con ese id',
            })
        }
        //Añadir administrador de laboratorio
        await usuario.addLaboratorio(laboratorio);

        res.status(201).json({
            ok: true,
            msg: 'Administrador agregado',
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error en el servidor'
        });
    }

}

const aceptarAdminCentral = async(req, res=response)=>{
    const { uid } = req.body;
    try {
        let usuario = await Usuario.findByPk(uid);
        if (usuario == null) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario con ese id',
            })
        }
        //Añadir administrador de laboratorio
        await usuario.createAdminCentral({
            id: uid,
        });

        res.status(201).json({
            ok: true,
            msg: 'Administrador agregado',
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error en el servidor'
        });
    }

}

const agregarAdminCentral = async(req, res=response)=>{
    const { id, name, email, password, lid } = req.body;
    try {
        let usuario = await Usuario.findOne({ where: { correo: email } });
        if (usuario != null) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese correo',
            })
        }
        usuario = await Usuario.findByPk(id);
        if (usuario !=null) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese id',
            })
        }

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        let encryptpass = bcrypt.hashSync(password, salt);

        usuario = await Usuario.create({
            id: id,
            correo: email,
            password: encryptpass,
            nombre: name,
            laboratorioId: lid,
        })

        await usuario.createAdminCentral({
            id: id,
        });

        res.status(201).json({
            ok: true,
            msg: 'Administrador agregado',
            id,
            name,
            email,
            password,
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error en el servidor'
        });
    }
}


const agregarAdminLaboratorio = async(req, res=response)=>{
    const { uid, name, email, password, lid } = req.body;
    try {
        let usuario = await Usuario.findOne({ where: { correo: email } });
        if (usuario != null) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese correo',
            })
        }
        usuario = await Usuario.findByPk(uid);
        if (usuario !=null) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese id',
            })
        }

        let laboratorio = await Laboratorio.findByPk(lid);
        if (laboratorio ==null) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un laboratorio con ese id',
            })
        }


        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        let encryptpass = bcrypt.hashSync(password, salt);

        usuario = await Usuario.create({
            id: uid,
            correo: email,
            password: encryptpass,
            nombre: name,
            laboratorioId: lid,
        })

        //Añadir administrador de laboratorio
        await usuario.addLaboratorio(laboratorio);

        res.status(201).json({
            ok: true,
            msg: 'Administrador agregado',
            uid,
            name,
            email,
            password,
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error en el servidor'
        });
    }

}

module.exports = {
    getUsuarios,
    aceptarAdminLaboratorio,
    aceptarAdminCentral,
    agregarAdminCentral,
    agregarAdminLaboratorio,
}