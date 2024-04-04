const request = require("request")

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

module.exports = {
    forecast: forecast
}