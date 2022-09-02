const { getProyectos, crearProyecto, eliminarProyecto, actualizarProyecto, getProyectosNombre, getProyecto } = require('../controllers/proyectos');
const { crearCategoria, getCategorias, getCategoriasNombre, getCategoria, actualizarCategoria, eliminarCategoria } = require('../controllers/categoria');
const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-JWT');
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require('../helpers/isDate');
const { validarAdmin } = require('../middlewares/validar-admin');

const router = Router();
//Validación de Token
//Obtener categorias
router.use(validarJWT);
router.get('/', getCategorias);

//Obtener categoria
router.get('/categoria/', [
    check('id', 'El id es obligatorio').not().isEmpty(),
    validarCampos
],
    getCategoria);

//Obtener categorias por nombre
router.put('/:nombre', getCategoriasNombre);

//Crear categoria
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarAdmin,
    validarCampos
],
    crearCategoria);

//Actualizar categoria
router.put('/categoria/:id', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarAdmin,
    validarCampos],
    actualizarCategoria);

//Borrar categoria
router.delete('/:id', validarAdmin, eliminarCategoria);

module.exports = router;