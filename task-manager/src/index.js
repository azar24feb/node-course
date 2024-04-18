const express = require('express')
require('./db/mongoose') // don't need anything from the file, only make sure it runs and connects to DB
const User = require('./models/user') // user.js and user - both works
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000 // required for Heroku deployment

app.use(express.json()) //required for json body requests from postman

//Create Users
app.post('/users', (req, res) => {
    const user = new User(req.body)
    console.log(user)
    user.save().then((result) => {
        res.send(result._id)
    }).catch((error) => {
        // https://httpstatus.in/
        res.status(400)
            .send(error.message)
    })
})

//Create Tasks
app.post('/tasks', (req, res) => {
    const task = new Task(req.body)
    task.save().then((result) => {
        res.send(result)
    }).catch((error) => {
        res.status(400)
            .send(error.message)
    })
})

app.listen(port, () => {
    console.log('Server is up and running on port 3000!!')
})