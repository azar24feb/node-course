const express = require('express')
require('./db/mongoose') // don't need anything from the file, only make sure it runs and connects to DB
const userRouter = require('./routers/userRouter') //import the user router
const taskRouter = require('./routers/taskRouter')

const app = express()
const port = process.env.PORT || 3000 // required for Heroku deployment

//Express middleware - this has to be done before all other app.use()
//Express Middleware for maintainance
// app.use((req, res, next) => {
//     res.status(503).send('Site under Maintanance!!') 
//     next() //this will call the route handler, if not added, it will never call route handler, dont call next for maintenance
// }) 

app.use(express.json()) //required for json body requests from postman
app.use(userRouter, taskRouter) //register the router from a different file

app.get('*', (req, res) => {
    res.status(500).send('Page Doesn\'t exist')
})

app.listen(port, () => {
    console.log('Server is up and running on port 3000!!')
})