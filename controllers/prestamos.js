// {
//     ok: true,
//     msg: "Obtener eventos"
// }
const { response } = require('express');
const ElementoLab = require('../models/ElementoLab');
const Evento = require("../models/Eventos");
const Prestamo = require('../models/Prestamo');
const Usuario = require('../models/Usuario');

const getPrestamos = async (req, res = response) => {

    const prestamos = await Prestamo.find();
    res.status(201).json({
        ok: true,
        prestamos
    });
}

const actualizarPrestamo = async (req, res = response) => {
    const prestamoId = req.params.id;
    const {idUsuario , idElemento } = req.body
    try {
        try {
            const prestamo = await Evento.findById(prestamoId);
            // if (evento.user.toString() !== req.uid) {
            //     return res.status(401).json({
            //         ok: false,
            //         msg: 'No tiene privilegio de editar este elemento'
            //     })
            // }
        }
        catch (error) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe prestamo con ese id'
            })
        }
        let usuario = await Usuario.findById(idUsuario)
        console.log(req.body.tipo);
        if (usuario == null) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario con ese id',
            });
        }

        let elemento = await ElementoLab.findById(idElemento)
        if (elemento == null) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un elemento con ese id',
            });
        }
        const nuevoPrestamo = {
            ...req.body,
            user: req.uid,
        }

        const prestamoActualizado = await Prestamo.findByIdAndUpdate(prestamoId, nuevoPrestamo, { new: true }); //Por defecto Mongo devuelve al objeto no actuañizado para poder hacer comparaciones, sin embargo al hacer new: true retorna al objeto actualizado
        res.json({
            ok: true,
            prestamo: prestamoActualizado,
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const crearPrestamo = async (req, res = response) => {

    const {idUsuario , idElemento } = req.body

    try {

        let usuario = await Usuario.findById(idUsuario)
        console.log(req.body.tipo);
        if (usuario == null) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario con ese id',
            });
        }

        let elemento = await ElementoLab.findById(idElemento)
        if (elemento == null) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un elemento con ese id',
            });
        }
        const prestamo = new Prestamo(req.body);

        const prestamoGuardado= await prestamo.save();
        res.json({
            ok: true,
            prestamo: prestamoGuardado
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const eliminarPrestamo = async (req, res = response) => {

    const prestamoId = req.params.id;
    try {
        try {
            const prestamo = await Prestamo.findById(prestamoId);
            if (prestamo == null) {
                return res.status(400).json({
                    ok: false,
                    msg: 'No existe un préstamo con ese id',
                });
            }
            // if (evento.user.toString() !== req.uid) {
            //     return res.status(401).json({
            //         ok: false,
            //         msg: 'No tiene privilegio de editar este elemento'
            //     })
            // }
        }
        catch (error) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe prestamo con ese id'
            })
        }

        await Prestamo.findByIdAndDelete(prestamoId);
        res.json({
            ok: true,
            msg: "Elemento borrado"
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    eliminarPrestamo,
    crearPrestamo,
    actualizarPrestamo,
    getPrestamos,
}