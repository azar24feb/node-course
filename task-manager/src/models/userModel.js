const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('../models/taskModel')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        default: 0,
        // this is a middleware function - before/after an event https://mongoosejs.com/docs/middleware.html
        validate(val) {
            if (val < 0) {
                throw new Error('Age must be >= 0!!')
            }
        }
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        validate(val) {
            if (!validator.isEmail(val)) {
                throw new Error('Invalid Email!!')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        validate(val) {
            if (val.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain password')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})

//Note: this is a virtual mapping, this data is not there in DB
userSchema.virtual('tasks', {
    ref: 'Task', //reference to the model
    localField: '_id', //mapping field in this table
    foreignField: 'userId' //mapping field in Task
})

// this is method for instance, not a static method, and arrow function will not work bcz it will need "this" binding
//these are called instance methods
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'secret', { expiresIn: '5d' })
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject() //plain js object and not a mongoose model
    delete userObject.password
    delete userObject.tokens
    return userObject
}

//for login function in router || statics is used for method for all instances of User model, like static method in java
//these are called Model methods
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('User doesn\'t exist')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    // console.log('isMatch:' + isMatch)
    if (!isMatch) {
        throw new Error('Incorrect Password!')
    }
    return user
}

//middleware methods 
//userSchema.pre - before user is saved
//userSchema.post - after user is saved || it should be a normal function, not an arrow function, because arrow function dont bind "this"
// to make it work on update, you have to make changes in update route, see code there
userSchema.pre('save', async function (next) {
    const user = this

    //user.isModified('password') - true when the user is created, and when this field is updated
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
        //for testing , password for user Azar is azar.123, and so on
    }

    next() //Call next after everything is done. if you dont call next, it will hang forever thinking middleware is still working,
})

//middleware to delete tasks when user is deleted
userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({ userId: user._id })
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User