const { getProyectos, crearProyecto, eliminarProyecto, actualizarProyecto, getProyectosNombre, getProyecto } = require('../controllers/proyectos');
const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-JWT');
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require('../helpers/isDate');
const { validarAdmin } = require('../middlewares/validar-admin');
const { añadirLaboratoriosExcel, añadirElementosExcel } = require('../controllers/manejoDocs');

const router = Router();
//Validación de Token
//Obtener eventos
router.use(validarJWT);
router.get('/laboratorios', añadirLaboratoriosExcel);
router.get('/elementos', añadirElementosExcel);

module.exports = router;