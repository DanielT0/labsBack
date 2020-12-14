const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-JWT');
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require('../helpers/isDate');
const { getElementos, crearElemento, actualizarElemento, eliminarElemento } = require('../controllers/elements');

const router = Router();
//Validación de Token
//Obtener eventos
router.use(validarJWT);
router.get('/', getElementos);

//Crear evento
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripción es obligatioria').not().isEmpty(),
    validarCampos
],
    crearElemento);

//Actualizar evento
router.put('/:id', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
    validarCampos],
    actualizarElemento);

//Borrar evento
router.delete('/:id', eliminarElemento);

module.exports = router;