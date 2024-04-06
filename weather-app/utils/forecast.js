const request = require("request")
const fs = require('fs')

const forecast = (lat, long, callback) => {
    const url = 'myurl'

    request({url: url, json:true}, (error, response) => {
        if (error) {
            callback(error,undefined)
        }
        else {
            callback(undefined, response)
        }
    })

     
}

request({url:'url', json:true}, (error, {body, header} = {}) => { //destructuring the response object and using DEFAULT empty object 
    return 
})

module.exports = {
    forecast: forecast
}