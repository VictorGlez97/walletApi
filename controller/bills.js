const { response } = require('express');
const Bill = require('../model/Bills');

const CreateBill = async ( req, res = response ) => {

    try {
        
        const newBill = new Bill( req.body );

        await newBill.save();

        return res.status(203).json({
            ok: true,
            msg: 'Exito: nueva acción registrada',
            bill: newBill
        });

    } catch (error) {
        
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Error. hubo un error al hacer la petición, hable con un administrador',
            error
        });

    }

}

const UpdateBill = async ( req, res = response ) => {

    try {
        
        const { id } = req.body;

        const verifyBill = Bill.findById({ id });
        
        if ( verifyBill == null || verifyBill == 'undefined' ) {
            return res.status(400).json({
                ok: false,
                msg: 'Error: registro no encontrado'
            });
        }

        const UpdatedBill = await Bill.findByIdAndUpdate( id, req.body, { new: true } );

        return res.status(200).json({
            ok: true,
            msg: 'Exito: registro actualizado',
            bill: UpdatedBill
        });

    } catch (error) {
        
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Error: hubo un problema al hacer la petición, hable con un administrador',
            error
        });

    }

}

const ShowBillsByUser = ( req, res = response ) => {

    try {
        
        const { id } = req.params;

        const billsxuser = Bill.find({ user: id })
                            //.populate('user')
                            .populate('priority');
                        
        return res.status(200).json({
            ok: true,
            msg: 'Exito',
            bill: billsxuser
        });

    } catch (error) {
        
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Error: hubo un problema al hacer la petición, hable con un administrador',
            error
        });

    }

}

module.exports = { CreateBill, UpdateBill, ShowBillsByUser }