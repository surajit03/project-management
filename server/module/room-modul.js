const mongoose = require('mongoose');
const { Schema } = mongoose;


const RoomSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    members: { type: [String] },
    // avatar: { type: Buffer },
}, { timestamps: true });

const rooms = mongoose.model('rooms', RoomSchema);

module.exports = rooms;
