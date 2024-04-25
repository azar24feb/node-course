const express = require('express')
require('./db/mongoose') // don't need anything from the file, only make sure it runs and connects to DB
const userRouter = require('./routers/userRouter') //import the user router
const taskRouter = require('./routers/taskRouter')

const app = express()
const port = process.env.PORT || 3000 // required for Heroku deployment

app.use(express.json()) //required for json body requests from postman
app.use(userRouter,taskRouter) //register the router from a different file

app.get('*', (req, res) => {
    res.status(500).send('Page Doesn\'t exist')
})

app.listen(port, () => {
    console.log('Server is up and running on port 3000!!')
})