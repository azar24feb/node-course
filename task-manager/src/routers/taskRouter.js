const express = require('express')
const Task = require('../models/task')

const router = new express.Router()

//Create Tasks
router.post('/tasks', (req, res) => {
    const task = new Task(req.body)
    task.save().then((result) => {
        res.status(201).send(result)
    }).catch((error) => {
        res.status(400)
            .send(error.message)
    })
})

//Get All tasks
router.get('/tasks', (req, res) => {
    Task.find().then((result) => {
        res.status(200).send(result)
    }).catch((err) => {
        res.status(400).send(err)
    })
})

//Get Task by Id
router.get('/tasks/:id', (req, res) => {
    const _id = req.params.id
    Task.findById(_id).then((result) => {
        if (!result) {
            return res.status(400).send('Not Found!!')
        }
        res.status(200).send(result)
    }).catch((err) => {
        res.status(500).send(err)
    })
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