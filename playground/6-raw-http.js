const http = require('node:http')

const url = 'http://reqres.in/api/users?page=2'

const request = http.request(url, (response) => {

    let data = ''

    response.on('data', (chunk) => {
        data = data + chunk.toString()
        console.log('chunk:' + chunk)
    })
    response.on('error', (err) => {
        console.log('error occurred' + err) 
    })
    response.on('end', () => {
        console.log(data)
        console.log('request ended!!')
    })
    // response.on()
})

// request.on('error', (err) => {
//     console.log('error occurred' + err) 
// })
request.end()