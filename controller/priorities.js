const { response } = require('express');
const { ObjectId } = require('mongodb');
const Priority = require('../model/Priorities');
const User = require('../model/User');

const CreatePriority = async ( req, res = response ) => {

    try {
        
        const { user } = req.body;

        ////console.log( user );

        const verifyUser = User.findOne({ '_id': user });

        ////console.log(verifyUser);

        if (verifyUser === null) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario no encontrado',
            });
        }

        const count = await Priority.aggregate([
            {
                $group: 
                {
                    _id : { user },
                    totalAmount: { $sum: '$total' },
                    count: { $sum: 1 }
                }
            }
        ]);

        //console.log( count[0].totalAmount );

        if ( (count[0].totalAmount + req.body.total) > 100 ) {
            
            return res.status(300).json({
                ok: false,
                msg: 'Error: porcentaje de prioridades excedido'
            });

        }

        const newPriority = new Priority(req.body);

        await newPriority.save();

        return res.status(203).json({
            ok: true,
            msg: 'Exito: prioridar creada correctamente',
            newPriority
        });


    } catch (error) {
        
        //console.log( error );

        return res.status(500).json({
            ok: false,
            msg : 'ERROR: HABLE CON UN ADMINISTRADOR',
            error        
        });

    }

}

const GetPrioritiesByUser = async ( req, res = response ) => {

    try {

        //console.log(req.params);

        const { id } = req.params;
        
        const prio = await Priority.find({ user: id })
                                    .populate('user');

        return res.status(200).json({
            ok: true,
            msg: 'Exito',
            priority: prio
        });

    } catch (error) {
        
        //console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Error: ha ocurrido un error, hable con un administrador',
            error
        });

    }

}

const UpdatePriority = async ( req, res = response ) => {

    try {
        
        const { id, user } = req.body;

        const verifyPriority = await Priority.find({ _id : id, user : user });

        if (verifyPriority == null) {
            return res.status(303).json({
                ok: false,
                msg: 'Error: prioridad no encontrada'
            });
        }

        const newPriority = {
            ...req.body,
            user : user
        };

        const updatedPriority = await Priority.findByIdAndUpdate( id, newPriority, { new: true } )

        return res.status(200).json({
            ok: true,
            msg: 'Exito: prioridad actualizada correctamente',
            priority: updatedPriority
        });

    } catch (error) {
        
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Error: hubo problemas al hacer la peticion, hable con un administrador',
            error
        });

    }

}

const PriorityAmount = async ( req, res = response ) => {

    try {
        
        const { id } = req.params;

        const count = await Priority.aggregate([
            {
                $group: 
                {
                    _id : { user: id },
                    totalAmount: { $sum: '$total' },
                    count: { $sum: 1 }
                }
            }
        ]);

        return res.status(200).json({
            ok: true,
            msg: 'Exito',
            count 
        });

    } catch (error) {
        
        //console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Error: hubo un problema al hacer la petición, hable con un administrador',
            error
        });

    }

}

module.exports = { CreatePriority, GetPrioritiesByUser, PriorityAmount }
