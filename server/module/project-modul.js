const mongoose = require('mongoose');
const { Schema } = mongoose;

const Project = new Schema({
    name: { type: String, required: true },
    key: { type: String, required: true, unique: true },
    members: { type: [{ type: String, unique: true }] },
    administrators: { type: [{ type: String, unique: true }] },
},
    { timestamps: true }
);
const project = mongoose.model("project", Project);
module.exports = project; 