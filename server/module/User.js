const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    Firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
    },
    role: {
        type: String,
        default: "Employee",
    },
    date: {
        type: Date,
        dafault: Date.now
    },
    favoriteProjects: [{ type: String, unique: true }],


});
const User = mongoose.model('user', UserSchema);
module.exports = User;