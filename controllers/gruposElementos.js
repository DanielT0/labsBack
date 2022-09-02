// {
//     ok: true,
//     msg: "Obtener eventos"
// }
const { response } = require('express');
const Grupo = require('../models/Grupo');
const sequelize = require('../database/config');
const Laboratorio = require('../models/Laboratorio');

const crearGrupo = async (req, res = response) => {
    let {nombre, laboratorioId} = req.body;
    const grupo = new Grupo(req.body);
    try {

        let grup = await Grupo.findOne({where:{
            nombre: nombre
        }})
        if (grup != null) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un grupo con ese nombre',
            })
        }

        let lab = await Laboratorio.findByPk(laboratorioId);
        if (lab == null) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un laboratorio con ese id',
            })
        }

        const grupoGuardado = await grupo.save();
        res.json({
            ok: true,
            grupo: grupoGuardado
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error en el servidor'
        });
    }
}

const getGrupos = async (req, res = response) => {
    const grupos = await Grupo.findAll();
    res.status(201).json({
        ok: true,
        grupos
    });
}

const getGruposNombre = async (req, res = response) => {
    const name = req.params.nombre;
    try {
        const grupos = await Grupo.findAll(
            {
                where: {
                    nombre:
                        sequelize.where(sequelize.fn('LOWER', sequelize.col('nombre')), 'LIKE', '%' + name + '%')
                }
            }
        );
        res.status(201).json({
            ok: true,
            grupos
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

const getGrupo = async (req, res = response) => {
    const { id } = req.body;
    try {
        const grupo = await Grupo.findByPk(id);
        if (!grupo) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe grupo alguno con ese id'
            })
        }
        res.status(201).json({
            ok: true,
            grupo
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error en el servidor'
        });
    }

}


const actualizarGrupo = async (req, res = response) => {
    const grupoId = req.params.id;
    let {nid, laboratorioId} = req.body;
    try {
        try {
            const grupo = await Grupo.findByPk(grupoId);
            if (grupo == null) {
                return res.status(400).json({
                    ok: false,
                    msg: 'No existe un grupo con ese id',
                })
            }
        }
        catch (error) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe grupo con ese id'
            })
        }

        let lab = await Laboratorio.findByPk(laboratorioId);
        if (lab == null) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un laboratorio con ese id',
            })
        }
        const nuevoGrupo = {
            ...req.body,
            id: nid,
        }

        await Grupo.update(nuevoGrupo, { where: { id: grupoId } }); 
        let grupoActualizado ;
        if(nid){
            grupoActualizado = await Grupo.findByPk(nid);
        }
        else{
            grupoActualizado = await Grupo.findByPk(grupoId);
        }
        res.json({
            ok: true,
            grupo: grupoActualizado,
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

const eliminarGrupo = async (req, res = response) => {

    const grupoId = req.params.id;
    try {
        const grupo = await Grupo.findByPk(grupoId);
        if (!grupo) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe grupo con ese id'
            })
        }

        await Grupo.destroy({ where: { id: grupoId } });
        res.json({
            ok: true,
            msg: "Grupo borrado"
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
    eliminarGrupo,
    crearGrupo,
    actualizarGrupo,
    getGrupos,
    getGruposNombre,
    getGrupo
}