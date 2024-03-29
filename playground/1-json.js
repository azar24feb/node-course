
const fs = require('fs')

const book = {
    title: 'A Song of Ice and Fire',
    author: 'George R. R. Martin'
}
const jsonStr = JSON.stringify(book)
console.log(jsonStr)

// JSON string must be in single quotes
const parsedData = JSON.parse('{"title":"A Song of Ice and Fire","author":"George R. R. Martin"}')
console.log(parsedData)
console.log(parsedData.author)

//write the js object to a file, first convert it to json string, and then write to a file
fs.writeFileSync('1-json.json',jsonStr)


//read the json file and recreate the js object

// after reading, the data that comes back is not a string, it is a buffer of binary data
const dataBuffer = fs.readFileSync('1-json.json')
// console.log(dataBuffer)
console.log(dataBuffer.toString())
//use JSON.parse() to parse the data


/*
Assignment

const fs = require('fs')

const jsonStr = fs.readFileSync('1-json.json').toString()
const obj = JSON.parse(jsonStr)
obj.name = 'Azar'
obj.planet = 'Mars'
obj.age = 30

fs.writeFileSync('1-json.json',JSON.stringify(obj))
*/
