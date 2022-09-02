const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-JWT');
const { validarCampos } = require("../middlewares/validar-campos");
const { getLaboratorios, crearLaboratorio, eliminarLaboratorio, actualizarLaboratorio, getLaboratorio, getLaboratoriosNombre } = require('../controllers/labs');
const { validarAdmin, validarAdminC } = require('../middlewares/validar-admin');

const router = Router();
//Validación de Token
//Obtener laboratorios
router.use(validarJWT);
router.get('/', getLaboratorios);

//Obtener laboratorio
router.get('/lab/', [
    check('id', 'El id es obligatorio').not().isEmpty(),
    validarCampos
],
    getLaboratorio);

//Obtener laboratorios por nombre
router.put('/lab/:nombre', getLaboratoriosNombre);

//Crear laboratorio
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
    check('tipo', 'El tipo de laboratorio es obligatorio').not().isEmpty(),
    validarAdminC,
    validarCampos
],
    crearLaboratorio);

//Actualizar laboratorio
router.put('/:id', [
    check('nombre', 'El nombre es obligatirio').not().isEmpty(),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
    check('tipo', 'El tipo de laboratorio es obligatorio').not().isEmpty(),
    validarAdmin,
    validarCampos],
    actualizarLaboratorio);

//Borrar laboratorio
router.delete('/:id', validarAdminC, eliminarLaboratorio);

module.exports = router;