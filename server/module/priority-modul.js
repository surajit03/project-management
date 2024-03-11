const mongoose = require('mongoose');
const { Schema } = mongoose.Schema;

const PrioritySchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    lable: {
        type: String,
        required: true
    },
    color: {
        type: String,
    },
    icon: {
        type: String,
    },
},
    { timestamps: true }
);

const Priority = mongoose.model('priority', PrioritySchema);
module.exports = Priority;