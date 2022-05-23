const { response } = require('express');
const User = require('../model/User');

const CreateUser = async ( req, res = response ) => {

    try {
        
        const { alias, name, pass } = req.body;
        
        let verifyUser = User.findOne({ alias });

        if (verifyUser === null) {
            return res.status(400).json({
                ok: true,
                msg: 'ERROR: YA EXISTE UN USUARIO CON ESE ALIAS'
            });
        }

        const newUser = new User({ name, alias, pass });

        await newUser.save();

        return res.status(203).json({
            ok: true,
            msg: 'Exito: usuario creado',
            newUser
        });

    } catch (error) {
        console.log( error );

        return res.status(500).json({
            ok: false,
            msg: 'ERROR: HABLE CON UN ADM',
            error
        });
    }
}

const LoginUser = async ( req, res = response ) => {

    try {
        
        const { pass, alias } = req.body;
        
        verifyUser = await User.findOne({ alias });

        //console.log(verifyUser);

        if (!verifyUser) {
            return res.status(400).json({
                ok: false,
                msg: 'Error: usuario o contraseña incorrecta'
            });
        }

        //console.log(pass, verifyUser.pass);

        verifypass = pass == verifyUser.pass;

        //console.log('verify' , verifypass);

        if (!verifypass) {
            return res.status(400).json({
                ok: false,
                msg: 'Error: usuario o contraseña incorrecta'
            });
        }

        return res.status(200).json({
            ok: true,
            msg: 'Exito: inicio de sesión',
            verifyUser
        });


    } catch (error) {
        
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Error: hubo un error, hable con un administrador',
            error
        });

    }

}

module.exports = { CreateUser, LoginUser }
