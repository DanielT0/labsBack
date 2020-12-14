const { getEventos, crearEvento, eliminarEvento, actualizarEvento } = require('../controllers/events');
const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-JWT');
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require('../helpers/isDate');

const router = Router();
//Validación de Token
//Obtener eventos
router.use(validarJWT);
router.get('/', getEventos);

//Crear evento
router.post('/', [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de finalización es obligatoria').custom(isDate),
    validarCampos
],
    crearEvento);

//Actualizar evento
router.put('/:id', [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de finalización es obligatoria').custom(isDate),
    validarCampos],
    actualizarEvento);

//Borrar evento
router.delete('/:id', eliminarEvento);

module.exports = router;