const Room = require("../module/room-modul");
const express = require('express');
const verifyUser = require("../verifyUser");

const router = express.Router();

// Route=1 Create a room using post"/room"

router.post('/room', verifyUser, async (req, res) => {

    const body = req.body;
    if (!body) {
        return res.status(400).json({ success: false, error: " You must provide a room" });
    }

    try {
        const room = new Room(body);

        if (!room) {
            return res.status(400).json({ success: false, error: err });
        }

        room.save().then(() => {
            return res.status(201).json({ success: true, id: room._id, message: "Room created!" });
        })
            .catch((error) => {
                return res.status(400).json({ error, message: "Room not ctreated!" });
            });

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error')
    }
});

// Route=2 update room using put"/room/:id"

router.put('/room/:id', verifyUser, async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({ success: false, error: "You must provide a body to update" });
    }

    try {
        Room.findOne({ _id: req.params.id }, (err, room) => {
            if (err) {
                return res.status(404).json({ err, massage: "Room not found!" });
            }
            const { name, time, description, members, avatar } = body;
            room.name = name;
            room.time = time;
            room.description = description;
            room.members = members;
            room.avatar = avatar;

            room.save().then(() => {
                return res.status(200).json({ success: true, id: room._id, message: "Room updated!" })
            })
                .catch((error) => {
                    return res.status(400).json({ error, message: "Room not updated!" });
                });
        })

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error')
    }

});

// Router=3 delete room using delete"?room/:id"

router.delete("/room/:id", verifyUser, async (req, res) => {
    try {
        await Room.findOneAndDelete({ _id: req.params.id }, (err, room) => {

            if (err) {
                return res.status(400).json({ succcess: false, error: err });
            }

            if (!room) {
                return res.status(400).json({ success: false, error: "Room not found!" });
            }

            return res.status(200).json({ success: true, data: room });
        })
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error')
    }
});

// Router=4 get room by id using get"/room/:id"

router.get("/room/:id", verifyUser, async (req, res) => {
    try {
        await Room.findOne({ _id: req.params.id }, (err, room) => {
            if (err) {
                return res.status(400).json({ succcess: false, error: err });
            }

            if (!room) {
                return res.status(400).json({ success: false, error: "Room not found!" });
            }

            return res.status(200).json({ success: true, data: room });
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error')
    }
});

// Router = 5 get room using get"/room"

router.get("/room", verifyUser, async(req, res) => {
    try {
        const rooms = await Room.find({});
        return res.status(200).json({ success: true, data: rooms });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error')
    }
});


module.exports = router;