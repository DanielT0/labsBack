const { response } = require('express');
const Laboratorio = require("../models/Laboratorio");
const sequelize = require('../database/config');
const { Sequelize } = require('sequelize');

const Op = Sequelize.Op;
const operatorsAliases = {
    $like: Op.like,
    $not: Op.not
}

const getLaboratorios = async (req, res = response) => {

    const laboratorios = await Laboratorio.findAll();
    res.status(201).json({
        ok: true,
        laboratorios
    });
}

const getLaboratoriosNombre = async (req, res = response) => {
    const name = req.params.nombre;
    try {
        const laboratorios = await Laboratorio.findAll(
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
            laboratorios
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

const getLaboratorio = async (req, res = response) => {
    const { id } = req.body;
    try {
        const laboratorio = await Laboratorio.findByPk(id);
        if (!laboratorio) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe laboratorio con ese id'
            })
        }
        res.status(201).json({
            ok: true,
            laboratorio
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error en el servidor'
        });
    }

}

const actualizarLaboratorio = async (req, res = response) => {
    const laboratorioId = req.params.id;
    const { nid } = req.body;
    try {
        try {
            const laboratorio = await Laboratorio.findByPk(laboratorioId);
        }
        catch (error) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe laboratorio con ese id'
            })
        }
        const labs = await Laboratorio.findAll({
            where: {
                nombre: nombre
            }
        });
        if (labs.length) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un laboratorio con ese nombre',
            })
        }
        const nuevoLaboratorio = {
            ...req.body,
            id: nid,
        }

        const laboratorioActualizado = await Laboratorio.update(nuevoLaboratorio, { where: { id: laboratorioId } }); //Por defecto Mongo devuelve al objeto no actuañizado para poder hacer comparaciones, sin embargo al hacer new: true retorna al objeto actualizado
        res.json({
            ok: true,
            laboratorio: laboratorioActualizado,
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

const crearLaboratorio = async (req, res = response) => {
    const { id, nombre, descripcion } = req.body
    try {

        let lab = await Laboratorio.findByPk(id);
        if (lab != null) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un laboratorio con ese id',
            })
        }

        const labs = await Laboratorio.findAll({
            where: {
                nombre: nombre
            }
        });
        if (labs.length) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un laboratorio con ese nombre',
            })
        }

        lab = await Laboratorio.create({
            id: id,
            nombre: nombre,
            descripcion: descripcion,
        })

        res.status(201).json({
            ok: true,
            msg: 'Laboratorio registrado',
            id,
            nombre,
            descripcion,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error en el servidor'
        });
    }
}

const eliminarLaboratorio = async (req, res = response) => {

    const laboratorioId = req.params.id;
    try {
        const laboratorio = await Laboratorio.findByPk(laboratorioId);
        if (!laboratorio) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe laboratorio con ese id'
            })
        }

        await Laboratorio.destroy({ where: { id: laboratorioId } });
        res.json({
            ok: true,
            msg: "Laboratorio borrado"
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

module.exports = {
    eliminarLaboratorio,
    crearLaboratorio,
    actualizarLaboratorio,
    getLaboratorios,
    getLaboratorio,
    getLaboratoriosNombre,
}