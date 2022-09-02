// {
//     ok: true,
//     msg: "Obtener eventos"
// }
const { response } = require('express');
const Proyecto = require('../models/Proyecto');
const sequelize = require('../database/config');

const crearProyecto = async (req, res = response) => {
    let {id, nombre} = req.body;
    const proyecto = new Proyecto(req.body);
    try {
        let proy = await Proyecto.findByPk(id);
        if (proy != null) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un proyecto con ese id',
            })
        }

        proy = await Proyecto.findOne({where:{
            nombre: nombre
        }})
        if (proy != null) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un proyecto con ese nombre',
            })
        }

        const proyectoGuardado = await proyecto.save();
        res.json({
            ok: true,
            proyecto: proyectoGuardado
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error en el servidor'
        });
    }
}

const getProyectos = async (req, res = response) => {
    console.log(req.uid);
    const proyectos = await Proyecto.findAll();
    res.status(201).json({
        ok: true,
        proyectos
    });
}

const getProyectosNombre = async (req, res = response) => {
    const name = req.params.nombre;
    try {
        const proyectos = await Proyecto.findAll(
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
            proyectos
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

const getProyecto = async (req, res = response) => {
    const { id } = req.body;
    try {
        const proyecto = await Proyecto.findByPk(id);
        if (!proyecto) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe proyecto con ese id'
            })
        }
        res.status(201).json({
            ok: true,
            proyecto
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error en el servidor'
        });
    }

}


const actualizarProyecto = async (req, res = response) => {
    const proyectoId = req.params.id;
    let {nid} = req.body;
    try {
        try {
            const proyecto = await Proyecto.findByPk(proyectoId);
            if (proyecto == null) {
                return res.status(400).json({
                    ok: false,
                    msg: 'No existe un proyecto con ese id',
                })
            }
        }
        catch (error) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe proyecto con ese id'
            })
        }
        const nuevoProyecto = {
            ...req.body,
            id: nid,
        }

        console.log(proyectoId);
        console.log(nid);

        await Proyecto.update(nuevoProyecto, { where: { id: proyectoId } }); 
        let proyectoActualizado ;
        if(nid){
            proyectoActualizado = await Proyecto.findByPk(nid);
        }
        else{
            proyectoActualizado = await Proyecto.findByPk(proyectoId);
        }
        res.json({
            ok: true,
            proyecto: proyectoActualizado,
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

const eliminarProyecto = async (req, res = response) => {

    const proyectoId = req.params.id;
    try {
        const proyecto = await Proyecto.findByPk(proyectoId);
        if (!proyecto) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe proyecto con ese id'
            })
        }

        await Proyecto.destroy({ where: { id: proyectoId } });
        res.json({
            ok: true,
            msg: "Proyecto borrado"
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
    eliminarProyecto,
    crearProyecto,
    actualizarProyecto,
    getProyectos,
    getProyectosNombre,
    getProyecto
}