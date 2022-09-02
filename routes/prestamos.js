const { getPrestamos, crearPrestamo, eliminarPrestamo, actualizarPrestamo, getPrestamo } = require('../controllers/prestamos');
const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-JWT');
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require('../helpers/isDate');
const { isEmptyArray } = require('../helpers/isEmptyArray');
const { validarAdmin } = require('../middlewares/validar-admin');

const router = Router();
//Validación de Token
router.use(validarJWT);

//Obtener préstamos
router.get('/', getPrestamos);

//Obtener proyecto
router.get('/prestamo/', [
    check('id', 'El id es obligatorio').not().isEmpty(),
    validarCampos
],
    getPrestamo);

// //Crear préstamo
router.post('/', [
    check('elementos', 'Los elementos son obligatorios').custom(isEmptyArray),
    check('fechaDevolucion', 'Fecha de devolución es obligatoria').custom(isDate),
    check('fechaPrestamo', 'Fecha de préstamo es obligatoria').custom(isDate),
    check('usuarioId', 'El id del usuario es obligatorio').not().isEmpty(),
    validarAdmin,
    validarCampos
],
    crearPrestamo);

// //Actualizar préstamo
router.put('/prestamo/:id', [
    check('elementos', 'Los elementos son obligatorios').custom(isEmptyArray),
    check('fechaDevolucion', 'Fecha de devolución es obligatoria').custom(isDate),
    check('fechaPrestamo', 'Fecha de préstamo es obligatoria').custom(isDate),
    check('usuarioId', 'El id del usuario es obligatorio').not().isEmpty(),
    validarAdmin,
    validarCampos],
    actualizarPrestamo);

// //Borrar evento
router.delete('/:id', validarAdmin, eliminarPrestamo);

module.exports = router;