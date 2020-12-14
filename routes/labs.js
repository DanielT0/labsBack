const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-JWT');
const { validarCampos } = require("../middlewares/validar-campos");
const { getLaboratorios, crearLaboratorio, eliminarLaboratorio, actualizarLaboratorio } = require('../controllers/labs');

const router = Router();
//Validación de Token
//Obtener eventos
router.use(validarJWT);
router.get('/', getLaboratorios);

//Crear evento
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
    check('laboratorio', 'El laboratorio es obligatorio').not().isEmpty(),
    check('categoria', 'La categorio es obligatoria').not().isEmpty(),
    validarCampos
],
    crearLaboratorio);

//Actualizar evento
router.put('/:id', [
    check('nombre', 'El nombre es obligatirio').not().isEmpty(),
    check('laboratorio', 'El laboratorio es obligatorio').not().isEmpty(),
    check('categoria', 'La categorio es obligatoria').not().isEmpty(),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
    validarCampos],
    actualizarLaboratorio);

//Borrar evento
router.delete('/:id', eliminarLaboratorio);

module.exports = router;