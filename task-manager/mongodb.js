
// const mongo = require('mongodb')
// const MongoClient = mongo.MongoClient
// const ObjectID = mongo.ObjectID
const { MongoClient, ObjectID } = require('mongodb') //Object destructuring

const conUrl = 'mongodb://127.0.0.1:27017'
const dbName = 'taskmanger'

const id = new ObjectID() //this id can be used in a document
console.log(id.getTimestamp())
console.log(id.id) //<Buffer 66 1b 8f dc b2 2d 36 1e 9c c8 ba e2>
 // id is a binary value, id.id gives the raw binary value, it is used to reduce the size of the id
 //id.id.length is 12, toHexString will convert it to 24 bit string

MongoClient.connect(conUrl, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to DB!!')
    }

    console.log('Connected to DB Successfully!!')
    const db = client.db(dbName)

    db.collection('users').insertOne({
        name: 'Parhina',
        age: 28
    }, (error, result) => {
         if (error){
            return console.log('Unable to insert user')
         }

         console.log(result.ops) // array of documents
    })

    /*
    //insert one data
    db.collection('users').insertOne({
        name: 'Uddin',
        age: 30
    }, (error, result) => {
         if (error){
            return console.log('Unable to insert user')
         }

         console.log(result.ops) // array of documents
    })
    */

    /*
    insert multiple documents  
    db.collection('users').insertMany([
        {
            name: 'Shomi',
            age: 25
        }, {
            name: 'Arif',
            age: 13
        }
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert Users!!')
        }

        console.log(result.ops)
    })

    db.collection('tasks').insertMany([
        {
            description: 'Clean the House',
            completed: true
        }, {
            description: 'Arif\'s Education',
            completed: false
        }
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert Users!!')
        }

        console.log(result.ops)
    })
    */


})