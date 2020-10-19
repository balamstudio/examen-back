/*
    Ruta: /api/examen
*/
const { Router } = require('express');

const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const {
    getExamen,
    crearExamen
} = require('../controllers/examen.controller');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getExamen);

router.post(
    '/', [
        validarJWT,
        // check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    ],
    crearExamen
);

module.exports = router;