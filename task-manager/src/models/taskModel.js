const validator = require('validator')
const mongoose = require('mongoose')

const Task = mongoose.model('Task',{
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' //refernce to the Model, exact name
    }
})

module.exports = Task