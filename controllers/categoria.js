// {
//     ok: true,
//     msg: "Obtener eventos"
// }
const { response } = require('express');
const Categoria = require('../models/Categoria');
const sequelize = require('../database/config');

const crearCategoria = async (req, res = response) => {
    let { id, nombre } = req.body;
    try {
        let categoria = await Categoria.findByPk(id);
        if (categoria != null) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe una categoria con ese id',
            })
        }

        categoria = await Categoria.findOne({
            where: {
                nombre: nombre
            }
        })
        if (categoria != null) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe una categoria con ese nombre',
            })
        }

        categoria = new Categoria(req.body);
        const categoriaGuardada = await categoria.save();
        res.json({
            ok: true,
            categoria: categoriaGuardada
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error en el servidor'
        });
    }
}

const getCategorias = async (req, res = response) => {
    console.log(req.uid);
    const categorias = await Categoria.findAll();
    res.status(201).json({
        ok: true,
        categorias
    });
}

const getCategoriasNombre = async (req, res = response) => {
    const name = req.params.nombre;
    try {
        const categorias = await Categoria.findAll(
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
            categorias
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

const getCategoria = async (req, res = response) => {
    const { id } = req.body;
    try {
        const categoria = await Categoria.findByPk(id);
        if (!categoria) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe categoría con ese id'
            })
        }
        res.status(201).json({
            ok: true,
            categoria
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error en el servidor'
        });
    }

}


const actualizarCategoria = async (req, res = response) => {
    const categoriaId = req.params.id;
    let { nid, nombre } = req.body;
    try {
        let categoria = await Categoria.findByPk(categoriaId);
        if (categoria == null) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe una categoría con ese id',
            })
        }
        categoria = await Categoria.findOne({
            where: {
                nombre: nombre
            }
        })
        if (categoria != null) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe una categoria con ese nombre',
            })
        }
        const nuevaCategoria = {
            ...req.body,
            id: nid,
        }

        await Categoria.update(nuevaCategoria, { where: { id: categoriaId } });
        let categoriaActualizada;
        if (nid) {
            categoriaActualizada = await Categoria.findByPk(nid);
        }
        else {
            categoriaActualizada = await Categoria.findByPk(categoriaId);
        }
        res.json({
            ok: true,
            categoria: categoriaActualizada,
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

const eliminarCategoria = async (req, res = response) => {

    const categoriaId = req.params.id;
    try {
        const categoria = await Categoria.findByPk(categoriaId);
        if (!categoria) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe categoría con ese id'
            })
        }

        await Categoria.destroy({ where: { id: categoriaId } });
        res.json({
            ok: true,
            msg: "Categoría borrada"
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
    crearCategoria,
    getCategorias,
    getCategoriasNombre,
    getCategoria,
    actualizarCategoria,
    eliminarCategoria,
}