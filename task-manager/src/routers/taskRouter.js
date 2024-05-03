const express = require('express')
const Task = require('../models/taskModel')
const auth = require('../middleware/auth')

const router = new express.Router()

//Create Tasks
/*
router.post('/tasks', (req, res) => {
    const task = new Task(req.body)
    task.save().then((result) => {
        res.status(201).send(result)
    }).catch((error) => {
        res.status(400)
            .send(error.message)
    })
})
*/

router.post('/tasks', auth, async (req, res) => {
    try {
        const task = new Task({
            ...req.body, // spread operator, copies all properties
            userId: req.user._id
        })
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

//Get All tasks
router.get('/tasks/all', (req, res) => {
    Task.find().then((result) => {
        res.status(200).send(result)
    }).catch((err) => {
        res.status(400).send(err)
    })
})

//Get All tasks for authenticated user
router.get('/tasks', auth, async (req, res) => {
    try {
        //the below method is used to get all tasks for the user, for this to work, userSchema.virtual is used and ref is used in Task, check code
        await req.user.populate('tasks').execPopulate()
        res.send(req.user.tasks)
    } catch (error) {
        res.status(400).send(error)
    }

})

//Get Task by Id
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    //need tasks for the authenticated users
    try {
        const task = await Task.findOne({ _id, userId: req.user._id })

        if (!task) {
            return res.status(404).send('Not Found!!')
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

//update tasks
router.patch('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        if (!task) {
            return res.status(400).send('Task not Found!')
        }

        res.send(task)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

module.exports = router