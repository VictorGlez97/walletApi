const { Schema, model } = require("mongoose");

const PrioritySchema = new Schema({

    name : {
        type : String,
        required : true
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    description : {
        type : String
    },
    total : {
        type : Number,
        required : true
    },
    color : {
        type: String
    }

});

module.exports = model("Priority", PrioritySchema);
