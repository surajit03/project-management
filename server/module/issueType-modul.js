const mongoose = require('mongoose');
const { Schema } = mongoose.Schema;

const IssueTypeSchema = new Schema({
    id:{
        type: String,
        required: true,
        unique: true
    },
    label: {
        type: String,
        required: true
    },
    icon: {
        type: String,
    },
    color: {
        type: String,
    },
},
    { timestamps: true }
);

const IssueType = mongoose.model('issueType', IssueTypeSchema);
module.exports = IssueType;
