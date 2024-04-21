require('../src/db/mongoose')
const User = require('../src/models/user')

//id 66210f30b1730d6ca0630193
// In the below code, 1st age is update, then a count is done for all doc with the given age

//Implementation with ****Promise Chaining****
User.findByIdAndUpdate('66210f30b1730d6ca0630193', {
    age: 25
}).then((user) => {
    console.log(user) // this returns the object before update
    return User.countDocuments({ age: 25 }) // return a promise to count docs with the age
}).then((count) => {
    console.log(count) 
}).catch((err) => {
    console.log(err) 
})

//challenge with Task app - to remove use Model.findByIdAndDelete()

//Implementation with ****async await****
const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { //here also, the object returned is before the update
        age // note, this is equal to age: age
    })
    console.log('aync await: ' + user)
    return await User.countDocuments({ age })
}

updateAgeAndCount('66210f30b1730d6ca0630193', 25).then((count) => {
    console.log(count) 
})