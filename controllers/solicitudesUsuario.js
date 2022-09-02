const bcrypt = require('bcryptjs/dist/bcrypt');
const { response } = require('express');
const Laboratorio = require('../models/Laboratorio');
const SolicitudUsuario = require('../models/SolicitudesUsuario');
const Usuario = require('../models/User');

const getSolicitudesUsuario = async (req, res = response) => {
    const solicitudes = await SolicitudUsuario.findAll();
    res.status(201).json({
        ok: true,
        solicitudes
    });
}


const crearSolicitudUsuario = async (req, res = response) => {
    let { idUsuario, correo, laboratorioId, nombre, password, tipoU, mensaje } = req.body;
    try {
        let solicitud = await SolicitudUsuario.findOne({
            where: {
                correo: correo
            }
        });
        if (solicitud != null) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe una solicitud de ese correo',
            })
        }

        let usuario = await Usuario.findByPk(idUsuario);
        if (usuario != null) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese id',
            })
        }

        usuario = await Usuario.findOne({
            where: {
                correo: correo
            }
        });
        if (usuario != null) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese correo',
            })
        }

        let laboratorio = await Laboratorio.findByPk(laboratorioId);
        if (!laboratorio) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un laboratorio con ese id',
            })
        }

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        let encryptpass = bcrypt.hashSync(password, salt);

        solicitudGuardada = await SolicitudUsuario.create({
            idUsuario: idUsuario,
            correo: correo,
            password: encryptpass,
            nombre: nombre,
            laboratorioId: laboratorioId,
            tipo: tipoU,
            mensaje: mensaje,
        })

        res.json({
            ok: true,
            solicitud: solicitudGuardada
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error en el servidor'
        });
    }
}

const getSolicitudesUsuarioLaboratorio = async (req, res = response) => {
    const lab = req.params.lab;
    const solicitudes = await SolicitudUsuario.findAll({
        where: {
            laboratorioId: lab,
        }
    });
    res.status(201).json({
        ok: true,
        solicitudes
    });
}

const getElementosNombre = async (req, res = response) => {
    const name = req.params.nombre;
    try {
        const elementos = await ElementoIndividual.findAll(
            {
                where: {
                    nombre:
                        // {
                        //     [Op.like]: '%' + request.body.query + '%'
                        // }
                        sequelize.where(sequelize.fn('LOWER', sequelize.col('nombre')), 'LIKE', '%' + name + '%')
                }
            }
        );
        res.status(201).json({
            ok: true,
            elementos
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error en el servidor'
        });
        console.log(error);
    }
}

const getSolicitudUsuario = async (req, res = response) => {
    const { id } = req.body;
    try {
        const solicitud = await SolicitudUsuario.findByPk(id);
        if (!solicitud) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe solicitud con ese id'
            })
        }
        res.status(201).json({
            ok: true,
            solicitud
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error en el servidor'
        });
    }

}

const eliminarSolicitudesUsuario = async (req, res = response) => {

    const solicitudId = req.params.id;
    try {
        const solicitud = await SolicitudUsuario.findByPk(solicitudId);
        if (!solicitud) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una solicitud con ese id'
            })
        }

        await SolicitudUsuario.destroy({ where: { id: solicitudId } });
        res.json({
            ok: true,
            msg: "Solicitud borrada"
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error en el servidor'
        });
    }
}


const aceptarSolicitudUsuario = async (req, res = response) => {
    const { id } = req.body;
    try {
        const solicitud = await SolicitudUsuario.findByPk(id);
        if (!solicitud) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe solicitud con ese id'
            })
        }
        const { idUsuario, correo, password, nombre, tipo, laboratorioId } = solicitud;
        let usuario = await Usuario.findByPk(idUsuario);
        if (usuario != null) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese id',
            })
        }

        usuario = await Usuario.findOne({
            where: {
                correo: correo
            }
        });
        if (usuario != null) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese correo',
            })
        }

        usuario = await Usuario.create({
            id: id,
            correo: correo,
            password: password,
            nombre: nombre,
            laboratorioId: laboratorioId,
        })

        if (tipo == 'AdministradorL') {
            //Añadir administrador de laboratorio
            await usuario.addLaboratorio(laboratorioId);
        } else if (tipo == 'AdministradorC') {
            //Añadir administrador central
            await usuario.createAdminCentral({
                id: id,
            });
        }

        await SolicitudUsuario.destroy({ where: { id: id } });

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

module.exports = {
    getSolicitudesUsuarioLaboratorio,
    crearSolicitudUsuario,
    getSolicitudUsuario,
    eliminarSolicitudesUsuario,
    aceptarSolicitudUsuario,
}