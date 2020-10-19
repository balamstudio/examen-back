const { response } = require('express');

const bcrypt = require('bcryptjs');

const Examen = require('../models/examen');

const { generarJWT } = require('../helpers/jwt');

const getExamen = async(req, res) => {

    const desde = Number(req.query.desde) || 0;
    console.log(desde);

    const [examenes, total] = await Promise.all([
        Examen
        .find({}, 'email')
        .skip(desde)
        .limit(5),
        Examen.countDocuments()
    ]);


    res.json({
        ok: true,
        examenes,
        total,
        uid: req.uid
    });
};


const crearExamen = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        const existeEmail = await Examen.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const examen = new Examen(req.body);
        const salt = bcrypt.genSaltSync();
        examen.password = bcrypt.hashSync(password, salt);

        await examen.save();
        const token = await generarJWT(examen.uid);

        res.json({
            ok: true,
            examen

        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }

};

module.exports = {
    getExamen,
    crearExamen
};