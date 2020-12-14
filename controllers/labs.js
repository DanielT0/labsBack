const { response } = require('express');
const Laboratorio = require("../models/Laboratorio");

const getLaboratorios = async (req, res = response) => {

    const laboratorios = await Laboratorio.find();
    res.status(201).json({
        ok: true,
        laboratorios
    });
}

const actualizarLaboratorio = async (req, res = response) => {
    const laboratorioId = req.params.id;
    try {
        try {
            const laboratorio = await Laboratorio.findById(laboratorioId);
        }
        catch (error) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe laboratorio con ese id'
            })
        }
        const nuevoLaboratorio = {
            ...req.body,
            user: req.uid,
        }

        const laboratorioActualizado = await Laboratorio.findByIdAndUpdate(laboratorioId, nuevoLaboratorio, { new: true }); //Por defecto Mongo devuelve al objeto no actuañizado para poder hacer comparaciones, sin embargo al hacer new: true retorna al objeto actualizado
        res.json({
            ok: true,
            evento: laboratorioActualizado,
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

const crearLaboratorio = async (req, res = response) => {

    const laboratorio = new Laboratorio(req.body);

    try {

        const laboratorioGuardado = await laboratorio.save();
        res.json({
            ok: true,
            evento: laboratorioGuardado
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const eliminarLaboratorio = async (req, res = response) => {

    const laboratorioId = req.params.id;
    try {
        try {
            const laboratorio = await Laboratorio.findById(laboratorioId);
        }
        catch (error) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe laboratorio con ese id'
            })
        }

        await Laboratorio.findByIdAndDelete(laboratorioId);
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
    eliminarLaboratorio,
    crearLaboratorio,
    actualizarLaboratorio,
    getLaboratorios,
}