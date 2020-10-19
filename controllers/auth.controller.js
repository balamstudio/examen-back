const { response } = require('express');

const bcrypt = require('bcryptjs');

// importamos el modelo de Usuarios y lo ponemos en mayuscula por que va a ser un objeto
const Examen = require('../models/examen');
const { generarJWT } = require('../helpers/jwt');



const login = async(req, res = response) => {

    // Ectraemos el email y el password del body
    const { email, password } = req.body;



    try {


        // Verificar email
        const examenDB = await Examen.findOne({ email });
        // Si no existe correo dispara el error
        if (!examenDB) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo no existe'
            });
        }

        // Verificar contraseña
        // Lo revisamos con compareSync  y mandamos el password enviado, y el de la BD
        const validPassword = bcrypt.compareSync(password, examenDB.password);
        // Si no es valido
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contrsaeña no es válida'
            });
        }

        // Generar el TOKEN - JWT con el helper jwt.js que creamos
        // como la funcion devuelve una promesa podemos usar await
        const token = await generarJWT(examenDB.id);



        res.json({
            ok: true,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }

}



// Exportamos el objeto que va a tener mi funcion
module.exports = {
    login
};