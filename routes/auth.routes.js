/*
    Ruta: /api/login
*/
const { Router } = require('express');

const router = Router();

// Importamos el check de express-validador
const { check } = require('express-validator');
// Importamos el middleware
const { validarCampos } = require('../middlewares/validar-campos');

const { login } = require('../controllers/auth.controller');

router.post('/', [
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    ],
    login
);




module.exports = router;