// {
//     ok: true,
//     msg: "Obtener eventos"
// }
const { response } = require('express');
const ElementoIndividual = require('../models/ElementoIndividual');
const sequelize = require('../database/config');
const Categoria = require('../models/Categoria');
const Proyecto = require('../models/Proyecto');
const Grupo = require('../models/Grupo');

const crearElementoIndividual = async (req, res = response) => {
    let { id, nombre, categoriumId, proyectoId, grupoId} = req.body;
    try {
        let elemento = await ElementoIndividual.findByPk(id);
        if (elemento != null) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un elemento con ese id',
            })
        }

        elemento = await ElementoIndividual.findOne({
            where: {
                nombre: nombre
            }
        })
        if (elemento != null) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un elemento con ese nombre',
            })
        }

        let categoria = await Categoria.findByPk(categoriumId);
        if (categoria ==  null) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe una categoría con ese id',
            })
        }

        let proyecto = await Proyecto.findByPk(proyectoId);
        if (proyecto == null) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un proyecto con ese id',
            })
        }

        let grupo = await Grupo.findByPk(grupoId);
        if (grupo == null) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un grupo con ese id',
            })
        }

        elemento = new ElementoIndividual(req.body);
        const elementoGuardado = await elemento.save();
        res.json({
            ok: true,
            elemento: elementoGuardado
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error en el servidor'
        });
    }
}

const getElementos = async (req, res = response) => {
    console.log(req.uid);
    const elementos = await ElementoIndividual.findAll();
    res.status(201).json({
        ok: true,
        elementos
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

const getElemento = async (req, res = response) => {
    const { id } = req.body;
    try {
        const elemento = await ElementoIndividual.findByPk(id);
        if (!elemento) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe elemento con ese id'
            })
        }
        res.status(201).json({
            ok: true,
            elemento
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error en el servidor'
        });
    }

}


const actualizarElemento = async (req, res = response) => {
    const elementoId = req.params.id;
    let { nid,categoriumId, proyectoId, grupoId}  = req.body;
    try {
        const elemento = await ElementoIndividual.findByPk(elementoId);
        if (elemento == null) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un elemento con ese id',
            })
        }
        const nuevoElemento = {
            ...req.body,
            id: nid,
        }

        let categoria = await Categoria.findByPk(categoriumId);
        if (categoria ==  null) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe una categoría con ese id',
            })
        }

        let proyecto = await Proyecto.findByPk(proyectoId);
        if (proyecto == null) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un proyecto con ese id',
            })
        }

        let grupo = await Grupo.findByPk(grupoId);
        if (grupo == null) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un grupo con ese id',
            })
        }

        await ElementoIndividual.update(nuevoElemento, { where: { id: elementoId } });
        let elementoActualizado;
        if (nid) {
            elementoActualizado = await ElementoIndividual.findByPk(nid);
        }
        else {
            elementoActualizado = await ElementoIndividual.findByPk(elementoId);
        }
        res.json({
            ok: true,
            categoria: elementoActualizado,
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

const eliminarElemento = async (req, res = response) => {

    const elementoId = req.params.id;
    try {
        const elemento = await ElementoIndividual.findByPk(elementoId);
        if (!elemento) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe elemento con ese id'
            })
        }

        await ElementoIndividual.destroy({ where: { id: elementoId } });
        res.json({
            ok: true,
            msg: "Elemento borrado"
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
    crearElementoIndividual,
    getElementos,
    getElementosNombre,
    getElemento,
    actualizarElemento,
    eliminarElemento
}