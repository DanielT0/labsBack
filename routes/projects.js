const { getProyectos, crearProyecto, eliminarProyecto, actualizarProyecto, getProyectosNombre, getProyecto } = require('../controllers/proyectos');
const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-JWT');
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require('../helpers/isDate');
const { validarAdmin } = require('../middlewares/validar-admin');

const router = Router();
//Validación de Token
//Obtener eventos
router.use(validarJWT);
router.get('/', getProyectos);

//Obtener proyecto
router.get('/proyecto/', [
    check('id', 'El id es obligatorio').not().isEmpty(),
    validarCampos
],
    getProyecto);

//Obtener proyectos por nombre
router.put('/:nombre', getProyectosNombre);

//Crear proyecto
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('laboratorioId', 'Seleccione un laboratorio').not().isEmpty(),
    validarAdmin,
    validarCampos
],
    crearProyecto);

//Actualizar proyecto
router.put('/proyecto/:id', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('laboratorioId', 'Seleccione un laboratorio').not().isEmpty(),
    validarAdmin,
    validarCampos],
    actualizarProyecto);

//Borrar proyecto
router.delete('/:id', validarAdmin, eliminarProyecto);

module.exports = router;