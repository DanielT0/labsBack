const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-JWT');
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require('../helpers/isDate');
const { getElementos, getElementosNombre, crearElemento, actualizarElemento, eliminarElemento, crearElementoIndividual, getElemento } = require('../controllers/elementoLab');
const { validarAdmin } = require('../middlewares/validar-admin');
const { crearSolicitudUsuario, getSolicitudesUsuarioLaboratorio, getSolicitudUsuario, eliminarSolicitudesUsuario, aceptarSolicitudUsuario } = require('../controllers/solicitudesUsuario');

const router = Router();
//Validación de Token
//Obtener elementos
router.get('/', getElementos);

//Obtener solicitudes por laboratorio
router.put('/lab/:lab', getSolicitudesUsuarioLaboratorio);

//Obtener solicitud
router.get('/solicitud/', [
    check('id', 'El id es obligatorio').not().isEmpty(),
    validarCampos,
    validarAdmin
],
    getSolicitudUsuario);

//Crear solicitud usuario
router.post('/', [
    check('idUsuario', 'El id del usuario es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('tipoU', 'Debe haber seleccionado un tipo de usuario').not().isEmpty(),
        check('laboratorioId', 'Debe haber seleccionado un laboratorio').not().isEmpty(),
        check('correo', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('password', 'La contraseña debe tener mínimo 6 caracteres').isLength({ min: 6 }),
        check("password", "La contraseña debe tener al menos un número, una mayúscula, una minúscula y un carácter especial").isStrongPassword(),
    validarCampos
],
    crearSolicitudUsuario);

//Aceptar solicitud usuario
router.post('/aceptar/', [
    check('id', 'El id de la solicitud es obligatorio').not().isEmpty(),
    validarJWT,
    validarAdmin,
    validarCampos
],
    aceptarSolicitudUsuario);

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

// //Borrar solicitud usuario
router.delete('/:id', [
    validarJWT,
    validarAdmin
], eliminarSolicitudesUsuario);

module.exports = router;