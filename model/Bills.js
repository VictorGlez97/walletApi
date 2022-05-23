const { Schema, model } = require('mongoose');

const BillSchema = new Schema({

    description : {
        type: String
    },
    amount : {
        type: Number,
        required: true
    },
    date : {
        type: Date,
        required: true
    },
    priority : {
        type: Schema.Types.ObjectId,
        ref : 'Priority',
        required: true
    },
    user : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

})

module.exports = model("Bill", BillSchema);
