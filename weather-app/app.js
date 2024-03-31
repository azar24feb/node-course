const request = require('request')
const fs = require('fs')

const url = 'http://api.weatherstack.com/current?access_key=032d91a0571712f5f457ede507b4a970&query=Bangalore'

//request({options object, what we want to do// URL}, function to run once object is done)
//json: true - automatically parse json response
request({ url: url, json: true }, (error, response) => {
    // console.log(error)
    // only one of error or response is populated and the other one is "undefined"
    //response has lots of property, response "data" is in data property
    // const data = JSON.parse(response.body)

    if (error) {

    } else {
        if (response.body.success) {
            const data = response.body.current
            const temp = data.temperature
            console.log('It is currently ' + temp + ' degrees out!')
        }
        else {
            console.log(response.body)
        }
    }
})

//Use Geocoding, to get Lat and long of an address
/*
not using actual code as Weather API requires credit card details
*/
const latUrl = 'latUrl'

// request({url: latUrl, json:true}, (error, response) => {
//     //fetch lat and longitude from the latUrl
//     //check the json respnse in a browser and then fetch the fields based on the objects
//     // eg - response.data.lat[0]
// })