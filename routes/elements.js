const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-JWT');
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require('../helpers/isDate');
const { getElementos, crearElemento, actualizarElemento, eliminarElemento } = require('../controllers/elementoLab');

const router = Router();
//Validación de Token
//Obtener elementos
router.use(validarJWT);
router.get('/', getElementos);

//Crear elementos
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre no puede contener números').not().isNumeric(),
    check('categoria', 'Seleccione una categoría').not().isEmpty(),
    check('laboratorio', 'Seleccione una laboratorio').not().isEmpty(),
    check('proyecto', 'Seleccione un proyecto').not().isEmpty(),
    validarCampos
],
    crearElemento);

//Actualizar elemento
router.put('/:id', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre no puede contener números').not().isNumeric(),
    check('categoria', 'Seleccione una categoría').not().isEmpty(),
    check('laboratorio', 'Seleccione una laboratorio').not().isEmpty(),
    check('proyecto', 'Seleccione un proyecto').not().isEmpty(),
    validarCampos],
    actualizarElemento);

//Borrar elemento
router.delete('/:id', eliminarElemento);

module.exports = router;