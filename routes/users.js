const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-JWT');
const { validarCampos } = require("../middlewares/validar-campos");;
const { getUsuarios, aceptarAdminLaboratorio, aceptarAdminCentral, agregarAdminCentral, agregarAdminLaboratorio } = require('../controllers/users');
const { validarAdminC, validarAdmin } = require('../middlewares/validar-admin');

const router = Router();
//Validación de Token
//Obtener usuarios
router.use(validarJWT);
router.get('/', validarAdmin, getUsuarios);
router.post('/aceptar-admin-l', 
    [
        validarAdminC,
        check('uid', 'El id del usuario es obligatorio').not().isEmpty(),
        check('lid', 'El id del laboratorio es obligatorio').isEmpty(),
    ],  aceptarAdminLaboratorio);

router.post('/aceptar-admin-c', 
    [
        validarAdminC,
        check('uid', 'El id del usuario es obligatorio').not().isEmpty(),
    ],  aceptarAdminCentral);

router.post('/agregar-admin-c', 
    [
        validarAdminC,
        check('id', 'El id del usuario es obligatorio').not().isEmpty(),
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('password', 'La contraseña debe tener mínimo 6 caracteres').isLength({ min: 6 }),
        check("password", "La contraseña debe tener al menos un número, una mayúscula, una minúscula y un carácter especial").isStrongPassword(),
    ],  agregarAdminCentral);

    router.post('/agregar-admin-l', 
    [
        validarAdminC,
        check('uid', 'El id del usuario es obligatorio').not().isEmpty(),
        check('lid', 'El id del laboratorio es obligatorio').isEmpty(),
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('password', 'La contraseña debe tener mínimo 6 caracteres').isLength({ min: 6 }),
        check("password", "La contraseña debe tener al menos un número, una mayúscula, una minúscula y un carácter especial").isStrongPassword(),
    ],  agregarAdminLaboratorio);

module.exports = router;