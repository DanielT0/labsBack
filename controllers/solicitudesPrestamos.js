// {
//     ok: true,
//     msg: "Obtener eventos"
// }
const { response } = require('express');
const Prestamo = require('../models/Prestamo');
const sequelize = require('../database/config');
const Categoria = require('../models/Categoria');
const Proyecto = require('../models/Proyecto');
const Grupo = require('../models/Grupo');
const Elemento = require('../models/ElementoIndividual');
const ElementosPrestamo = require('../models/GrupoPrestamo');

const crearPrestamo = async (req, res = response) => {
    let { id, elementos } = req.body;
    try {
        let prestamo = await Prestamo.findByPk(id);
        if (prestamo != null) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un préstamo con ese id',
            })
        }

        for (let idElemento of elementos) {
            let element = await Elemento.findByPk(idElemento);
            if (!element) {
                return res.status(404).json({
                    ok: false,
                    msg: `No existe elemento con el id ${idElemento}`
                })
            }
        }

        prestamo = new Prestamo(req.body);
        let elementosGuardados = [];
        const prestamoGuardado = await prestamo.save();
        for (let idElemento of elementos) {
            let element = await Elemento.findByPk(idElemento);
            await prestamo.addElemento(element);
            elementosGuardados.push(element);
        }
        res.json({
            ok: true,
            prestamo: prestamoGuardado,
            elementos: elementosGuardados,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error en el servidor'
        });
    }
}

const getPrestamos = async (req, res = response) => {
    console.log(req.uid);
    const prestamos = await Prestamo.findAll({
        include: [{
            model: Elemento,
            required: true,
        }]
    });
    res.status(201).json({
        ok: true,
        prestamos
    });
}

const getPrestamo = async (req, res = response) => {
    const { id } = req.body;
    try {
        const prestamo = await Prestamo.findByPk(id, {
            include: [{
                model: Elemento,
                required: true,
            }]
        });
        if (!prestamo) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe préstamo con ese id'
            })
        }
        res.status(201).json({
            ok: true,
            prestamo
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error en el servidor'
        });
    }

}


const actualizarPrestamo = async (req, res = response) => {
    const prestamoId = req.params.id;
    let { nid, elementos } = req.body;
    try {
        const prestamo = await Prestamo.findByPk(prestamoId);
        if (prestamo == null) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un préstamo con ese id',
            })
        }

        for (let idElemento of elementos) {
            let element = await Elemento.findByPk(idElemento);
            if (!element) {
                return res.status(404).json({
                    ok: false,
                    msg: `No existe elemento con el id ${idElemento}`
                })
            }
        }

        const nuevoPrestamo = {
            ...req.body,
            id: nid,
        }

        await ElementosPrestamo.destroy({
            where: {prestamoId: prestamoId}
        });

        await Prestamo.update(nuevoPrestamo, { where: { id: prestamoId } });
        let prestamoActualizado;
        if (nid) {
            prestamoId = nid;
        }

        prestamoActualizado = await Prestamo.findByPk(prestamoId);
        for (let idElemento of elementos) {
            let element = await Elemento.findByPk(idElemento);
            await prestamoActualizado.addElemento(element);
        }
        prestamoActualizado = await Prestamo.findByPk(prestamoId, {
            include: [{
                model: Elemento,
                required: true,
            }]
        })
        res.json({
            ok: true,
            prestamo: prestamoActualizado,
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

const eliminarPrestamo = async (req, res = response) => {

    const prestamoId = req.params.id;
    try {
        const prestamo = await Prestamo.findByPk(prestamoId);
        if (!prestamo) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe préstamo con ese id'
            })
        }

        await Prestamo.destroy({ where: { id: prestamoId } });
        res.json({
            ok: true,
            msg: "Préstamo borrado"
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
    crearPrestamo,
    getPrestamos,
    getPrestamo,
    actualizarPrestamo,
    eliminarPrestamo,
}