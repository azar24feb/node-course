const request = require('request')
const fs = require('fs')
const { geoCode } = require('./utils/geoCode.js') // you can directly use geocode function
const forecast = require('./utils/forecast.js') // you need to call as forecast.forecast


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
            // console.log(response.body)
        }
    }
})

//Use Geocoding, to get Lat and long of an address
/*
not using actual code as Weather API requires credit card details
*/


//Common convention to use callback function is (error, data) only one is populated
geoCode('Bangalore', (error, data) => {
     console.log('Error:' + error)
     console.log(data)
})

//encodeURIComponent use it in URLs
console.log('encodeURI : ' + encodeURIComponent('azar is boy'))

// request({url: latUrl, json:true}, (error, response) => {
//     //fetch lat and longitude from the latUrl
//     //check the json respnse in a browser and then fetch the fields based on the objects
//     // eg - response.data.lat[0]
// })


/**Challenge
 * 
 * Goal: Create a reusable function for getting the forecast

1. Setup the "forecast" function in utils/forecast.js
2. Require the function in app.js and call it as shown below
3. The forecast function should have three potential calls to callback:
   - Low level error, pass string for error
   - Coordinate error, pass string for error
   - Success, pass forecast string for data (same format as from before)
 * 
 */

forecast.forecast(-75.7088, 44.1545, (error, data) => {
    console.log('Error', error)
    console.log('Data', data)
})