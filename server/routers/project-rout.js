// const express = require('express');
// const verifyUser = require("../verifyUser");
// const Project = require("../module/project-modul");
// const Issue = require("../module/issue-modul");

// const router = express.Router();

// // Create a project using post"/project"
// router.post('/project',    async (req, res) => {
//     const body = req.body;

//     if (!body) {
//         return res.status(400).json({ success: false, error: "You must provide a project" });
//     }

//     try {
//         const project = new Project(body);
//         const savedProject = await project.save();

//         if (!savedProject) {
//             return res.status(400).json({ success: false, message: "Project is not created" });
//         }

//         return res.status(201).json({ success: true, data: savedProject, message: "Project created!" });

//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Server Error')
//     }
// });

// // update project using put "/project/:id"

// router.put('/project/:id',    async (req, res) => {
//     const body = req.body;

//     if (!body) {
//         return res.status(400).json({ success: false, error: "You must provide a body to update" });
//     }

//     try {
//         const updatedProject = await Project.updateOne({ _id: req.params.id }, body);

//         if (!updatedProject) {
//             return res.status(404).json({ success: false, message: "Project not found" });
//         }

//         return res.status(200).json({ success: true, message: "Project updated!" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Server Error');
//     }
// }
// );

// // delete project using delete "project/:id"

// router.delete('/project/:id',    async (req, res) => {
//     try {
//         const delectProject = await Project.findOneAndDelect({ _id: req.params.id });

//         if (!delectProject) {
//             return res.status(404).json({ success: false, message: "Project not found" });
//         }
//         await Issue.deleteMany({ delectProjectId: req.params.id });
//         return req.status(200).json({ success: true, message: "Project deleted!", id: delectProject._id });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Server Error');
//     }
// })

// // get project using get "/project/:key"

// router.get("/project/:key",    (req, res) => {
//     try {
//         Project.findOne({ key: req.params.key }, (err, project) => {
//             if (err) {
//                 return res.status(404).json({ err, message: "Project not found!" });
//             }
//             return res.status(200).json({ success: true, data: project });
//         })
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Server Error');
//     }
// });

// // get all project using get "/projects"

// router.get("/projects",    async (req, res) => {
//     try {
//         const projects = await Project.find({});
//         if (!projects) {
//             return res.status(404).json({ success: false, message: "Projects not found" });
//         }
//         return res.status(200).json({ success: true, data: projects});
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Server Error');
//     }
// });


// module.exports = router;






const express = require('express');
const Project = require("../module/project-modul");
const joi = require('joi');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/projects',   async (req, res) => {
    try {
        const data = await Project.find({}, { task: 0, __v: 0, updatedAt: 0 })
        return res.send(data)
    } catch (error) {
        return res.send(error)
    }
})


router.get('/project/:id', async (req, res) => {
    if (!req.params.id) {
        return res.status(422).send({ data: { error: true, message: 'Id is required' } });
    }
    try {
        const project = await Project.findOne({ _id: req.params.id });
        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }
        return res.status(200).json({ success: true, data: project });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error');
    }
});


router.post('/project',   async (req, res) => {


    const project = joi.object({
        title: joi.string().min(3).max(30).required(),
        description: joi.string().required(),
    });

    const { error, value } = project.validate({ title: req.body.title, description: req.body.description });
    if (error) return res.status(422).send(error);

    try {
        const existingProject = await Project.findOne({ title: value.title });
        if (existingProject) {
            return res.status(422).send({ data: { error: true, message: 'A project with the same title already exists.' } });
        }

        const newProject = await new Project(value).save();
        res.send({ data: { title: newProject.title, description: newProject.description, updatedAt: newProject.updatedAt, _id: newProject._id } });
    } catch (e) {
        return res.status(500).send({ data: { error: true, message: 'Server error.' } });
    }
})

router.put('/project/:id',   async (req, res) => {
    // validate type 
    // const project = joi.object({
    //     title: joi.string().min(3).max(30).required(),
    //     description: joi.string().required(),
    // })

    // // // validation
    // const { error, value } = project.validate({ title: req.body.title, description: req.body.description });
    // if (error) return res.status(422).send(error)

    try {
        const updatedProject = await Project.updateOne({ _id:new mongoose.Types.ObjectId(req.params.id) }, { ...value }, { upsert: true });
        if (!updatedProject) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }
        return res.status(200).json({ success: true, message: "Project updated!" });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})

router.delete('/project/:id',   async (req, res) => {
    try {
        const data = await Project.deleteOne({ _id: mongoose.Types.ObjectId(req.params.id) })
        res.send(data)
    } catch (error) {
        res.send(error)
    }

})




router.post('/project/:id/task', async (req, res) => {
    try {
        // Check if req.params.id exists
        if (!req.params.id) return res.status(500).send(`Server error`);

        // Validate request body using Joi
        const taskSchema = joi.object({
            title: joi.string().min(3).max(30).required(),
            description: joi.string().required()
        });

        const { error, value } = taskSchema.validate(req.body);

        if (error) {
            // Extract error message
            const errorMessage = error.details[0].message;
            return res.status(422).send(errorMessage);
        }

        // Find the project by ID
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).send("Project not found");
        }

        // Determine task count and index
        const taskCount = project.task.length;
        const maxIndex = taskCount > 0 ? Math.max(...project.task.map(task => task.index)) : 0;

        // Update project with new task
        project.task.push({
            ...value,
            stage: "Requested",
            order: taskCount,
            index: maxIndex + 1
        });

        await project.save();

        return res.send(project);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});

router.get('/project/:id/task/:taskId', async (req, res) => {
    try {
        if (!req.params.id || !req.params.taskId) 
            return res.status(400).send({ error: true, message: 'Invalid parameters' });

        const projectId = req.params.id;
        const taskId = req.params.taskId;

        const project = await Project.findOne(
            { _id: projectId },
            { task: { $elemMatch: { _id: taskId } } }
        );

        if (!project) 
            return res.status(404).send({ error: true, message: 'Project or Task not found' });

        const task = project.task[0]; // Since $elemMatch returns an array with a single element

        if (!task) 
            return res.status(404).send({ error: true, message: 'Task not found' });

        return res.status(200).send(task);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: true, message: 'Internal Server Error' });
    }
});

router.put('/project/:id/task/:taskId',   async (req, res) => {

    if (!req.params.id || !req.params.taskId) return res.status(500).send(`server error`);

    // const task = joi.object({
    //     title: joi.string().min(3).max(30).required(),
    //     description: joi.string().required(),
    // })

    // const { error, value } = task.validate({ title: req.body.title, description: req.body.description });
    // if (error) return res.status(422).send(error)

    try {
        // const data = await Project.find({ $and: [{ _id: mongoose.Types.ObjectId(req.params.id) }, { "task._id": mongoose.Types.ObjectId(req.params.taskId) }] },{
        //     task: {
        //         $filter: {
        //             input: "$task",
        //             as: "task",
        //             cond: {
        //                 $in: [
        //                     "$$task._id",
        //                     [
        //                         mongoose.Types.ObjectId(req.params.taskId)
        //                     ]
        //                 ]
        //             }
        //         }
        //     }
        // })
        const data = await Project.updateOne({
            _id: mongoose.Types.ObjectId(req.params.id),
            task: { $elemMatch: { _id: mongoose.Types.ObjectId(req.params.taskId) } }
        }, { $set: { "task.$.title": value.title, "task.$.description": value.description } })
        return res.send(data)
    } catch (error) {
        return res.send(error)
    }

})

router.delete('/project/:id/task/:taskId',   async (req, res) => {

    if (!req.params.id || !req.params.taskId) return res.status(500).send(`server error`);

    try {
        const data = await Project.updateOne({ _id: mongoose.Types.ObjectId(req.params.id) }, { $pull: { task: { _id: mongoose.Types.ObjectId(req.params.taskId) } } })
        return res.send(data)
    } catch (error) {
        return res.send(error)
    }

})

router.put('/project/:id/todo',   async (req, res) => {
    let todo = []

    for (const key in req.body) {
        // todo.push({ items: req.body[key].items, name: req.body[key]?.name })
        for (const index in req.body[key].items) {
            req.body[key].items[index].stage = req.body[key].name
            todo.push({ name: req.body[key].items[index]._id, stage: req.body[key].items[index].stage, order: index })
        }
    }

    todo.map(async (item) => {
        await Project.updateOne({
            _id: mongoose.Types.ObjectId(req.params.id),
            task: { $elemMatch: { _id: mongoose.Types.ObjectId(item.name) } }
        }, { $set: { "task.$.order": item.order, "task.$.stage": item.stage } })
    })

    res.send(todo)
})

// router.use('/project/:id/task', async (req, res, next) => {
//     if (req.method !== "GET") return next()

//     if (!req.params.id) return res.status(500).send(`server error`);

//     try {
//         const data = await Project.find({ _id: mongoose.Types.ObjectId(req.params.id) }, { task: 1 })
//         return res.send(data)
//     } catch (error) {
//         return res.send(error)
//     }


// })

// router.get('/project/:id/task/:taskId', (req, res) => {
//     res.send(req.params)
// })




module.exports = router;