// {
//     ok: true,
//     msg: "Obtener eventos"
// }
const { response } = require('express');
const Evento = require("../models/Eventos");

const getEventos = async (req, res = response) => {

    const eventos = await Evento.find().populate('user', 'name');
    res.status(201).json({
        ok: true,
        eventos
    });
}

const actualizarEvento = async (req, res = response) => {
    const eventoId = req.params.id;
    try {
        try {
            const evento = await Evento.findById(eventoId);
            if (evento.user.toString() !== req.uid) {
                return res.status(401).json({
                    ok: false,
                    msg: 'No tiene privilegio de editar este elemento'
                })
            }
        }
        catch (error) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe evento con ese id'
            })
        }
        const nuevoEvento = {
            ...req.body,
            user: req.uid,
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true }); //Por defecto Mongo devuelve al objeto no actuañizado para poder hacer comparaciones, sin embargo al hacer new: true retorna al objeto actualizado
        res.json({
            ok: true,
            evento: eventoActualizado,
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

const crearEvento = async (req, res = response) => {

    const evento = new Evento(req.body);

    try {

        evento.user = req.uid;

        const eventoGuardado = await evento.save();
        res.json({
            ok: true,
            evento: eventoGuardado
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const eliminarEvento = async (req, res = response) => {

    const eventoId = req.params.id;
    try {
        try {
            const evento = await Evento.findById(eventoId);
            if (evento.user.toString() !== req.uid) {
                return res.status(401).json({
                    ok: false,
                    msg: 'No tiene privilegio de editar este elemento'
                })
            }
        }
        catch (error) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe evento con ese id'
            })
        }

        await Evento.findByIdAndDelete(eventoId);
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
    eliminarEvento,
    crearEvento,
    actualizarEvento,
    getEventos,
}