const express = require('express')
require('./db/mongoose') // don't need anything from the file, only make sure it runs and connects to DB
const User = require('./models/user') // user.js and user - both works

const app = express()
const port = process.env.PORT || 3000 // required for Heroku deployment

app.use(express.json()) //required for json body requests from postman

app.post('/users', (req, res) => {
    const user = new User(req.body)
    console.log(user)
    res.send('')
})

app.listen(port, () => {
    console.log('Server is up and running on port 3000!!')
})