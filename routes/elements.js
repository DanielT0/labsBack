const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-JWT');
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require('../helpers/isDate');
const { getElementos, getElementosNombre, crearElemento, actualizarElemento, eliminarElemento, crearElementoIndividual, getElemento } = require('../controllers/elementoLab');
const { validarAdmin } = require('../middlewares/validar-admin');

const router = Router();
//Validación de Token
//Obtener elementos
router.use(validarJWT);
router.get('/', getElementos);

//Obtener elementos por nombre
router.put('/:nombre', getElementosNombre);

//Obtener elemento
router.get('/elemento/', [
    check('id', 'El id es obligatorio').not().isEmpty(),
    validarCampos
],
    getElemento);

//Crear elementos
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('estado', 'El estado es obligatorio').not().isEmpty(),
    check('categoriumId', 'Seleccione una categoría').not().isEmpty(),
    check('grupoId', 'Seleccione un grupo').not().isEmpty(),
    check('proyectoId', 'Seleccione un proyecto').not().isEmpty(),
    validarAdmin,
    validarCampos
],
    crearElementoIndividual);

// Actualizar elemento
router.put('/elemento/:id', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('estado', 'El estado es obligatorio').not().isEmpty(),
    check('categoriumId', 'Seleccione una categoría').not().isEmpty(),
    check('grupoId', 'Seleccione un grupo').not().isEmpty(),
    check('proyectoId', 'Seleccione un proyecto').not().isEmpty(),
    validarAdmin,
    validarCampos],
    actualizarElemento);

// //Borrar elemento
router.delete('/:id', validarAdmin, eliminarElemento);

module.exports = router;