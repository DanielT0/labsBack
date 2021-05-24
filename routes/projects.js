const { getProyectos, crearProyecto, eliminarProyecto, actualizarProyecto } = require('../controllers/proyectos');
const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-JWT');
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require('../helpers/isDate');

const router = Router();
//Validación de Token
//Obtener eventos
router.use(validarJWT);
router.get('/', getProyectos);

//Crear proyecto
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('laboratorio', 'Seleccione un laboratorio').not().isEmpty(),
    validarCampos
],
    crearProyecto);

//Actualizar proyecto
router.put('/:id', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('laboratorio', 'Seleccione un laboratorio').not().isEmpty(),
    validarCampos],
    actualizarProyecto);

//Borrar proyecto
router.delete('/:id', eliminarProyecto);

module.exports = router;