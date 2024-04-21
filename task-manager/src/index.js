const express = require('express')
require('./db/mongoose') // don't need anything from the file, only make sure it runs and connects to DB
const User = require('./models/user') // user.js and user - both works
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000 // required for Heroku deployment

app.use(express.json()) //required for json body requests from postman

//Create Users
/*
app.post('/users', (req, res) => {
    const user = new User(req.body)
    console.log(user)
    user.save().then((result) => {
        res.status(201).send(result)
    }).catch((error) => {
        // https://httpstatus.in/
        res.status(400)
            .send(error.message)
    })
})
*/

//Create user with async await 
app.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        const u = await user.save()
        res.status(201).send(u)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

//Create Tasks
app.post('/tasks', (req, res) => {
    const task = new Task(req.body)
    task.save().then((result) => {
        res.status(201).send(result)
    }).catch((error) => {
        res.status(400)
            .send(error.message)
    })
})

//Get User
app.get('/users', (req, res) => {
    User.find().then((result) => {
        res.send(result)
    }).catch((err) => {
        console.log(err)
        res.status(500).send(err)
    })
})

// Get User by ID
app.get('/users/:id', (req, res) => {
    //req.query - this gives query params passed as ?key=value&key=value
    const _id = req.params.id
    //for mongoose we do not need to convert the id to ObjectID(id)
    User.findById(_id).then((result) => {
        if (!result) {
            return res.status(400).send()
        }
        res.status(200).send(result)
    }).catch((err) => {
        res.status(500).send(err)
    })
})

//Get All tasks
app.get('/tasks', (req, res) => {
    Task.find().then((result) => {
        res.status(200).send(result)
    }).catch((err) => {
        res.status(400).send(err)
    })
})

//Get Task by Id
app.get('/tasks/:id', (req, res) => {
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

//Updating users
/*
if you provide fields which are not present in the model, mongoose will simply ignore those fields. Custom code in needed to throw error
*/
app.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body) // this returns all the properties of the object as an array
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidUpdate = updates.every(x => allowedUpdates.includes(x))

    if (!isValidUpdate) {
        return res.status(400).send('Invalid Update!!')
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // options new:true will return the new updated user || otherwise user before the update is sent
            runValidators: true // default is false, hence need to provide runValidators
        })

        if (!user) {
            return res.status(404).send('Not Found')
        }
        res.send(user)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

//update tasks - it can be done in similar manner

//Delete User
app.delete('/users/:id', async (req, res) => {
    
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user){
            return res.status(404).send('Not Found!')
        }
        res.send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.get('*', (req, res) => {
    res.status(500).send('Page Doesn\'t exist')
})

app.listen(port, () => {
    console.log('Server is up and running on port 3000!!')
})