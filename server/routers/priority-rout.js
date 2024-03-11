const express = requier('express');
const verifyUser = require("../verifyUser");
const Priority = require("../module/priority-modul");

const router = express.Router();

//  Create a priority using posrt "/priority"

router.post('/priority', verifyUser, async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: "You must provide a priority"
        })
    }
    try {
        const priority = new Priority(body);
        const savedPriority = await priority.save();

        if (!savedPriority) {
            return res.status(400).json({
                success: false,
                message: "Priority is not crited!"
            })
        }
        return res.status(201).json({
            success: true,
            data: savedPriority,
            message: "Prorty crited!"
        })
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error')
    }

});

// update priority  using put "/priority/:id"

router.put('/priority/:/id', verifyUser, async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({ success: false, error: "You provide a body to update!" })
    }
    try {
        await Priority.updateOne({ _id: req.params.id }, body);
        return res.status(200).json({ success: true, message: "Priority updated!" })
    } catch (error) {
        return res.status(404).json({ success: false, message: "Priority not found!" })
    }
});

// delete priority using delete "/priority/:id"

router.delete('/priority/:id', verifyUser, async (req, res) => {
    try {
        const priority = await Priority.findOneAndDelete({ _id: req.params.id });
        if (!priority) {
            return res.status(404).json({ success: false, message: "Priority not found!" })
        }
        return res.status(200).json({ success: true, message: "Priority deleted!" })
    } catch (error) {
        return res.status(400).json({ success: false, error });
    }
});

// get priority by idusing  get "/priority/:id "

router.get('/priority/:id', verifyUser, async (req, res) => {
    try {
        const priority = await Priority.findOne({ _id: req.params.id });
        if (!priority) {
            return res.status(404).json({ success: false, message: "Priority not found!" });
        }
        return res.status(200).json({ success: true, data: priority });
    } catch (error) {
        return res.status(400).json({ success: false, error });
    }
});

// get  priority using get "/priority"

router.get('/priority', verifyUser, async (req, res) => {
    try {
        const priority = await Priority.find();
        if (!priority) {
            return res.status(404).json({ success: false, message: "Priority not found!" });
        }
        return res.status(200).json({ success: true, data: priority });
    } catch (error) {
        return res.status(400).json({ success: false, error });
    }
});


module, exports = router;
