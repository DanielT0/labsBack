const { getProyectos, crearProyecto, eliminarProyecto, actualizarProyecto, getProyectosNombre, getProyecto } = require('../controllers/proyectos');
const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-JWT');
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require('../helpers/isDate');
const { validarAdmin } = require('../middlewares/validar-admin');
const { getGrupos, crearGrupo, actualizarGrupo, eliminarGrupo, getGruposNombre, getGrupo } = require('../controllers/gruposElementos');

const router = Router();
//Validación de Token
//Obtener grupos
router.use(validarJWT);
router.get('/', getGrupos);

//Obtener grupo
router.get('/grupo/', [
    check('id', 'El id es obligatorio').not().isEmpty(),
    validarCampos
],
    getGrupo);

//Obtener grupos por nombre
router.put('/:nombre', getGruposNombre);

//Crear grupo
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('foto', 'La foto es obligatoria').not().isEmpty(),
    check('minimo', 'El mínimo debe ser un número').isNumeric(),
    check('laboratorioId', 'El laboratorio').isNumeric(),
    validarAdmin,
    validarCampos
],
    crearGrupo);

//Actualizar grupo
router.put('/grupo/:id', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('foto', 'La foto es obligatoria').not().isEmpty(),
    check('minimo', 'El mínimo debe ser un número').isNumeric(),
    check('laboratorioId', 'El laboratorio').isNumeric(),
    validarAdmin,
    validarCampos],
    actualizarGrupo);

//Borrar grupo
router.delete('/:id', validarAdmin, eliminarGrupo);

module.exports = router;