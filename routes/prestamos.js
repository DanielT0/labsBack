const { getPrestamos, crearPrestamo, eliminarPrestamo, actualizarPrestamo } = require('../controllers/prestamos');
const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-JWT');
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require('../helpers/isDate');

const router = Router();
//Validación de Token
//Obtener eventos
router.use(validarJWT);
router.get('/', getPrestamos);

//Crear préstamo
router.post('/', [
    check('idElemento', 'Seleccione el elemento').not().isEmpty(),
    check('fechaDevolucion', 'Fecha de devolución es obligatoria').custom(isDate),
    check('fechaPrestamo', 'Fecha de préstamo es obligatoria').custom(isDate),
    check('cantidad', 'La cantidad es obligatoria').isNumeric(),
    validarCampos
],
    crearPrestamo);

//Actualizar evento
router.put('/:id', [
    check('idElemento', 'Seleccione el elemento').not().isEmpty(),
    check('fechaDevolucion', 'Fecha de devolución es obligatoria').custom(isDate),
    check('fechaPrestamo', 'Fecha de préstamo es obligatoria').custom(isDate),
    check('cantidad', 'La cantidad es obligatoria').isNumeric(),
    validarCampos],
    actualizarPrestamo);

//Borrar evento
router.delete('/:id', eliminarPrestamo);

module.exports = router;