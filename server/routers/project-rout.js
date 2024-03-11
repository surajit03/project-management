const express = require('express');
const verifyUser = require("../verifyUser");
const Project = require("../module/project-modul");
const Issue = require("../module/issue-modul");

const router = express.Router();

// Create a project using post"/project"
router.post('/project', verifyUser, async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({ success: false, error: "You must provide a project" });
    }

    try {
        const project = new Project(body);
        const savedProject = await project.save();

        if (!savedProject) {
            return res.status(400).json({ success: false, message: "Project is not created" });
        }

        return res.status(201).json({ success: true, data: savedProject, message: "Project created!" });

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error')
    }
});

// update project using put "/project/:id"

router.put('/project/:id', verifyUser, async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({ success: false, error: "You must provide a body to update" });
    }

    try {
        const updatedProject = await Project.updateOne({ _id: req.params.id }, body);

        if (!updatedProject) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }

        return res.status(200).json({ success: true, message: "Project updated!" });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}
);

// delete project using delete "project/:id"

router.delete('/project/:id', verifyUser, async (req, res) => {
    try {
        const delectProject = await Project.findOneAndDelect({ _id: req.params.id });

        if (!delectProject) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }
        await Issue.deleteMany({ delectProjectId: req.params.id });
        return req.status(200).json({ success: true, message: "Project deleted!", id: delectProject._id });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})

// get project using get "/project/:key"

router.get("/project/:key", verifyUser, (req, res) => {
    try {
        Project.findOne({ key: req.params.key }, (err, project) => {
            if (err) {
                return res.status(404).json({ err, message: "Project not found!" });
            }
            return res.status(200).json({ success: true, data: project });
        })
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// get all project using get "/projects"

router.get("/projects", verifyUser, async (req, res) => {
    try {
        const projects = await Project.find({});
        if (!projects) {
            return res.status(404).json({ success: false, message: "Projects not found" });
        }
        return res.status(200).json({ success: true, data: projects});
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});


module.exports = router;

