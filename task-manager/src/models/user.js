const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

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
    }
})

//middleware methods 
//userSchema.pre - before user is saved
//userSchema.post - after user is saved || it should be a normal function, not an arrow function, because arrow function dont bind this
// to make it work on update, you have to make changes in update route, see code there
userSchema.pre('save', async function (next) {
    const user = this

    //user.isModified('password') - true when the user is created, and when this field is updated
    if (user.isModified('password')) {
        var pass = user.password
        var hashPass = await bcrypt.hash(pass, 8)
        user.password = hashPass
    }

    next() //Call next after everything is done. if you dont call next, it will hang forever thinking middleware is still working,
})

const User = mongoose.model('User', userSchema)

module.exports = User