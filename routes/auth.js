/*
    Rutas de usuarios / Auth
    host + /api/auth
*/

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-JWT');
const router = Router();

router.post(
    '/new',
    [ //middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('password', 'La contraseña debe tener mínimo 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario);

router.post('/',
    [ //middlewares
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').isStrongPassword(),
        check('password', 'La contraseña debe tener mínimo 6 caracteres').isLength({ min: 6 }),
        validarCampos,
    ], loginUsuario);

router.get('/renew', validarJWT,  revalidarToken);

module.exports = router;