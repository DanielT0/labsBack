// {
//     ok: true,
//     msg: "Obtener eventos"
// }
const { response } = require('express');
const Elemento = require('../models/Elemento');
const ElementoLab = require('../models/ElementoLab');
const Evento = require("../models/Eventos");
var mongoose = require('mongoose');

const getElementos = async (req, res = response) => {

    const elementos = await ElementoLab.find();
    res.status(201).json({
        ok: true,
        elementos
    });
}

const actualizarElemento = async (req, res = response) => {
    const elementoId = req.params.id;
    try {
        try {
            const elemento = await ElementoLab.findById(elementoId);
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
                msg: 'No existe elemento con ese id'
            })
        }
        const nuevoelemento = {
            ...req.body,
            user: req.uid,
        }

        const elementoActualizado = await ElementoLab.findByIdAndUpdate(elementoId, nuevoelemento, { new: true }); //Por defecto Mongo devuelve al objeto no actuañizado para poder hacer comparaciones, sin embargo al hacer new: true retorna al objeto actualizado
        res.json({
            ok: true,
            elemento: elementoActualizado,
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

const crearElemento = async (req, res = response) => {

    const { idElemento } = req.body

    try {
        
        let element = await ElementoLab.findOne({idElemento})
        console.log(element);
        if (element !== null) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un elemento con ese id',
            });
        }

        element = new ElementoLab(req.body);
        // idElemento = mongoose.Types.ObjectId(idElemento);
        // element._id=idElemento

        const elementoGuardado = await element.save();
        res.json({
            ok: true,
            element: elementoGuardado
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const eliminarElemento = async (req, res = response) => {

    const elementoId = req.params.id;
    try {
        try {
            const elemento = await ElementoLab.findById(elementoId);
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
                msg: 'No existe elemento con ese id'
            })
        }

        await ElementoLab.findByIdAndDelete(elementoId);
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
    eliminarElemento,
    crearElemento,
    actualizarElemento,
    getElementos,
}