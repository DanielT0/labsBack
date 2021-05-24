// {
//     ok: true,
//     msg: "Obtener eventos"
// }
const { response } = require('express');
const Evento = require("../models/Eventos");
const Proyecto = require('../models/Proyecto');

const getProyectos = async (req, res = response) => {

    const proyectos = await Proyecto.find();
    res.status(201).json({
        ok: true,
        proyectos
    });
}

const actualizarProyecto = async (req, res = response) => {
    const proyectoId = req.params.id;
    try {
        try {
            const proyecto = await Proyecto.findById(proyectoId);
        }
        catch (error) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe proyecto con ese id'
            })
        }
        const nuevoProyecto = {
            ...req.body,
            user: req.uid,
        }

        const proyectoActualizado = await Proyecto.findByIdAndUpdate(proyectoId, nuevoProyecto, { new: true }); //Por defecto Mongo devuelve al objeto no actuañizado para poder hacer comparaciones, sin embargo al hacer new: true retorna al objeto actualizado
        res.json({
            ok: true,
            evento: proyectoActualizado,
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

const crearProyecto = async (req, res = response) => {

    const proyecto = new Proyecto(req.body);

    try {
        const proyectoGuardado = await proyecto.save();
        res.json({
            ok: true,
            proyecto: proyectoGuardado
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const eliminarProyecto = async (req, res = response) => {

    const proyectoId = req.params.id;
    try {
        try {
            const proyecto = await Proyecto.findById(proyectoId);
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
                msg: 'No existe proyecto con ese id'
            })
        }

        await Proyecto.findByIdAndDelete(proyectoId);
        res.json({
            ok: true,
            msg: "Proyecto eliminado"
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
    eliminarProyecto,
    crearProyecto,
    actualizarProyecto,
    getProyectos,
}