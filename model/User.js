const { Schema, model } = require('mongoose');

const UserSchema = new Schema({

    name: {
        type: String
    },
    alias: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    }

});

module.exports = model('User', UserSchema);
