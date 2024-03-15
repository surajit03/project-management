const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IssueSchema = new Schema({
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'project',
        required: true
    },
    createrorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    issueTypeId: {
        type: Schema.Types.ObjectId,
        ref: 'IssueType',
        required: true
    },
    assignnerId: {
        type: String,
    },
    priorityId: {
        type: Schema.Types.ObjectId,
        ref: 'Priority',
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    statusId: {
        type: Schema.Types.ObjectId,
        ref: 'Kanban',
        required: true
    },
    epicId: {
        type: String,
    },
    index: {
        type: Number,
    },
},
    { timestamps: true });

const Issue = mongoose.model('issue', IssueSchema);
module.exports = Issue;
