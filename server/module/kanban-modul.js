const mongoose = require('mongoose');
const { Schema } = mongoose.Schema;

const KanbanSchema = new Schema({
    label: {
        type: String,
        required: true
    },
    index: {
        type: Number,
    },
    className: {
        type: String,
    },
},
    { timestamps: true }
);

const Kanban = mongoose.model('kanban', KanbanSchema);
module.exports = Kanban;