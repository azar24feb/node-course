const express = require('express')
const User = require('../models/userModel') // user.js and user - both works
const auth = require('../middleware/auth')

const router = new express.Router()

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
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

//Login
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        // res.send({ user: user.getPublicProfile(), token }) //in userSchema, if you name the method as getPublicProfile, then this code, if you name as toJSON, then "user" will work
        res.send({ user, token })
    } catch (e) {
        res.status(400).send(e.message)
    }
})

//Logout - this will take the auth token used to login, and invalidate that token, other token used 
// for other logins (other devices) should not be affected
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(x => x.token !== req.token) //x is an object in "tokens" which has the token property
        await req.user.save()
        res.send(req.user.name + ' Logged Out!!')
    } catch (error) {
        console.log('error: ' + error)
        res.status(500).send(error)
    }
})

//Logout from all places - delete all tokens
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send(req.user.name + ' Logged Out from all places!!')
    } catch (error) {
        console.log('error: ' + error)
        res.status(500).send(error)
    }
})

router.get('/users/me', auth, async (req, res) => {
    try {
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

//Get Users - this is useless as no user should be able to pull up details of other users
router.get('/users', (req, res) => {
    User.find().then((result) => {
        res.send(result)
    }).catch((err) => {
        console.log(err)
        res.status(500).send(err)
    })
})

/*
// Get User by ID - useless as one user should not be able to look up another user
router.get('/users/:id', auth, (req, res) => {
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
*/


//Updating users
/*
if you provide fields which are not present in the model, mongoose will simply ignore those fields. Custom code in needed to throw error
*/
router.patch('/users/me', auth, async (req, res) => {
    console.log(user)
    const updates = Object.keys(req.body) // this returns all the properties of the object as an array
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidUpdate = updates.every(x => allowedUpdates.includes(x))

    if (!isValidUpdate) {
        return res.status(400).send('Invalid Update!!')
    }

    try {
        // const user = await User.findById(req.params.id) //user is fetched by auth token
        const user = await req.user
        updates.forEach(x => user[x] = req.body[x])
        await user.save()

        /** this code will not apply the middleware function written on the userSchema
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // options new:true will return the new updated user || otherwise user before the update is sent
            runValidators: true, // default is false, hence need to provide runValidators
        })
        */ 
        res.send(user)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

//update tasks - it can be done in similar manner

//Delete User
router.delete('/users/me', auth, async (req, res) => {

    try {
        // const user = await User.findByIdAndDelete(req.params.id) //id from params is taken 'users/:id'
        // const user = await User.findByIdAndDelete(req.user._id) // alternate is remove()
        await req.user.remove()
        res.send(req.user)
    } catch (error) {
        res.status(500).send(error.message)
    }
})


module.exports = router