const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-JWT');
const { validarCampos } = require("../middlewares/validar-campos");;
const { getUsuarios } = require('../controllers/users');

const router = Router();
//Validación de Token
//Obtener usuarios
router.use(validarJWT);
router.get('/', getUsuarios);

module.exports = router;