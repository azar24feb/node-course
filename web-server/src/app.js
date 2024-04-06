const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

//For serving static assets
// console.log(__dirname) //__filename
const publicPath = path.join(__dirname, '../public')
// console.log(publicPath)
app.use(express.static(publicPath))

//Modify the views path, i.e. path of hbs templates || default is web-server/views
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//For Dynamic content, set the template engine - hbs
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//this will render the index.hbs in views directory and pass the object
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App!!',
        name: 'Azar Uddin'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page!!',
        name: 'Azar Uddin'
    })
})

app.get('/weather', (req, res) => {
    res.send({
        location: 'Bangalore',
        forecast: 'It is currently 35 degrees!!'

    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page!!',
        name: 'Azar Uddin',
        helpText: 'This is a Help Page!'
    })
})

app.get('*', (req, res) => {
    res.send('My 404 Page!!')
})

app.listen(3000, () => {
    console.log('Server is up on port 3000!!')
})