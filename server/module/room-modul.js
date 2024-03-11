const mongoose =require("mongoose")
const{Schema}= mongoose.Schema;

const Room = new Schema({
    name:{type:String,required:true},
    description:{type:String},
    members:{type:[String]},
    avatar:{type:Buffer},

},
{timestamps:true}
);
const rooms = mongoose.model("rooms",Room)
module.exports = rooms;