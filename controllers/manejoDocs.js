const { response } = require('express');
const Categoria = require('../models/Categoria');
const sequelize = require('../database/config');
const XLSX = require("xlsx");
const Laboratorio = require('../models/Laboratorio');
const Elemento = require('../models/ElementoIndividual');
const Grupo = require('../models/Grupo');

const añadirLaboratoriosExcel = async (req, res = response) => {

    const excel = XLSX.readFile(
        "./public/static/media/inventarios.xlsx"
    );
    var nombreHoja = excel.SheetNames; // regresa un array
    let datos = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[0]]);
    // const workSheetsFromFile = xlsx.parse('./public/static/media/inventarios.xlsx');
    // console.log(datos);

    const laboratoriosACrear = [];

    let { id, nombre } = req.body;
    try {
        for (let i = 0; i < datos.length; i++) {
            let dato = datos[i];
            let lab = { nombre: dato["NOMBRE LABORATORIO"], descripcion: `Ubicado en el ${dato["UBICACIÓN LAB"]}` }
            if (!laboratoriosACrear.includes(lab)) {
                laboratoriosACrear.push(lab);
            }
            // console.log(dato["NOMBRE LABORATORIO"]);
            // jDatos.push({
            //   ...dato,
            //   Fecha: new Date((dato.Fecha - (25567 + 2)) * 86400 * 1000)
            // });
        }

        for (let i = 0; i < laboratoriosACrear.length; i++) {
            let { nombre, descripcion } = laboratoriosACrear[i];
            if (nombre && descripcion) {
                const labs = await Laboratorio.findAll({
                    where: {
                        nombre: nombre
                    }
                });
                if (!labs.length) {
                    let lab = await Laboratorio.create({
                        nombre: nombre,
                        descripcion: descripcion,
                    })
                }
            }
        }
        res.json({
            ok: true,
            msg: "Laboratorios guardados"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error en el servidor'
        });
    }
}

const añadirElementosExcel = async (req, res = response) => {

    const excel = XLSX.readFile(
        "./public/static/media/inventarios.xlsx"
    );
    var nombreHoja = excel.SheetNames; // regresa un array
    let datos = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[0]]);

    const elementosACrear = [];
    try {
        for (let i = 0; i < datos.length; i++) {
            let dato = datos[i];
            let element = {
                nombre: dato["NOMBRE DEL EQUIPO O IMPLEMENTO"],
                descripcion: `Sirve para ${dato["DESCRIPCIÓN PARA QUE SIRVE EL EQUIPO"]}, 
            es modelo ${dato["MODELO"]} y marca ${dato["MARCA"]}`,
                estado: 'Completo',
                observaciones: `Proveído por: ${dato["PROVEEDOR"]}`,
                proyectoId: 0,
                categoriumId: 0,
                grupoId: 0,
                laboratorio: dato["NOMBRE LABORATORIO"]
            }
            if (!elementosACrear.includes(element)) {
                elementosACrear.push(element);
            }
            // console.log(dato["NOMBRE LABORATORIO"]);
            // jDatos.push({
            //   ...dato,
            //   Fecha: new Date((dato.Fecha - (25567 + 2)) * 86400 * 1000)
            // });
        }

        for (let i = 0; i < elementosACrear.length; i++) {
            let { nombre, descripcion, estado, observaciones, proyectoId, categoriumId, grupoId, laboratorio } = elementosACrear[i];
            if (laboratorio) {
                let lab = await Laboratorio.findOne({
                    where: {
                        nombre: laboratorio
                    }
                });
                if (lab) {
                    laboratorio = lab.id;
                    let grupo = await Grupo.findOne({
                        where: {
                            nombre: nombre,
                            laboratorioId: laboratorio,
                        }
                    });
                    if (grupo) {
                        grupoId = grupo.id;
                    }
                    else {
                        const newGrupo = await Grupo.create({
                            nombre: nombre,
                            foto: 'https://ak.picdn.net/shutterstock/videos/31642735/thumb/1.jpg',
                            minimo: 10,
                            laboratorioId: lab.id
                        })
                        grupoId = newGrupo.id;
                    }
                }
            }
            if (nombre && descripcion) {
                let lab = await Elemento.create({
                    nombre: nombre,
                    descripcion: descripcion,
                    estado: estado,
                    observaciones: observaciones,
                    proyectoId: proyectoId,
                    categoriumId, categoriumId,
                    grupoId: grupoId
                })
                console.log(`Elemento ${nombre} guardado`)
            }
        }
        res.json({
            ok: true,
            msg: "Elementos guardados"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error en el servidor'
        });
    }
}

module.exports = {
    añadirLaboratoriosExcel,
    añadirElementosExcel
}