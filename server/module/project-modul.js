// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const Project = new Schema({
//     name: { type: String, required: true },
//     key: { type: String, required: true, unique: true },
//     members: { type: [{ type: String, unique: true }] },
//     administrators: { type: [{ type: String, unique: true }] },
// },
//     { timestamps: true }
// );
// const project = mongoose.model("project", Project);
// module.exports = project; 



const mongoose =require( "mongoose");

const project = new mongoose.Schema({
    title: {
        type: String,
        unique: true // `email` must be unique
    },
    description: String,
    task: [
        {
            id: Number,
            title: String,
            description: String,
            order: Number,
            stage: String,
            index: Number,
            attachment: [
                { type: String, url: String }
            ],
            created_at: { type: Date, default: Date.now },
            updated_at: { type: Date, default: Date.now },
        }
    ]
}, { timestamps: true })


const Project = mongoose.model("Project", project);
module.exports = Project; 

