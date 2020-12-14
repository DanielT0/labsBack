const { response } = require('express');
const Elemento = require("../models/Elemento");

const getElementos = async (req, res = response) => {

    const elementos = await Elemento.find();
    res.status(201).json({
        ok: true,
        elementos
    });
}

const actualizarElemento = async (req, res = response) => {
    const elementoId = req.params.id;
    try {
        try {
            const elemento = await Elemento.findById(elementoId);
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

        const elementoActualizado = await Elemento.findByIdAndUpdate(elementoId, nuevoelemento, { new: true }); //Por defecto Mongo devuelve al objeto no actuañizado para poder hacer comparaciones, sin embargo al hacer new: true retorna al objeto actualizado
        res.json({
            ok: true,
            evento: elementoActualizado,
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

    const elemento = new elemento(req.body);

    try {

        const elementoGuardado = await Elemento.save();
        res.json({
            ok: true,
            evento: elementoGuardado
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
            const elemento = await Elemento.findById(elementoId);
        }
        catch (error) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe elemento con ese id'
            })
        }

        await Elemento.findByIdAndDelete(elementoId);
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