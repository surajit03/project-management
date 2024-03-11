const Room = require("../module/room-modul");
const express = require('express');
const  verifyUser =require("../verifyUser");

const router = express.Router();

// Route=1 Create a room using post"/room"

router.post('/room',verifyUser,async(req,res)=>{

    const body = req.body;
    if (!body){
        return res.status(400).json({success:false, error:" You must provide a room"});
    }

    try {
        const room = 
    } catch (error) {
        
    }
})