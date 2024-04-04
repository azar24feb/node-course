const request = require("request")

const geoCode = (address, callback) => {
    //send http request
    /**
     * const url = latUrl+address
     * 
     */
    const latUrl = 'http://reqres.in/api/users?page=2'
    //abstract the callback so that the callback can decide what to do with error or data
    request({url : latUrl, json:true}, (error, response) => {
       if (error) {
           console.log(error)
           callback(error, undefined)
       }
       else {
           callback(undefined, response.body)
       }
    })
}

module.exports = {
    geoCode: geoCode
}