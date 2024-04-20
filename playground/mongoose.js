const mongoose = require('mongoose')
const validator = require('validator')

const conUrl = 'mongodb://127.0.0.1:27017/task-manager-api' //here db name is provided with url, unlike mongodb
mongoose.connect(conUrl, {
    useNewUrlParser: true,
    useCreateIndex: true
})

//Creating a model
//validation -- 
const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true,
        // minlength: 7
        // val.includes('password') -- code for string.contains
    },
    age: {
        type: Number,
        default: 0,
        validate(val) {
            if (val < 0) {
                throw new Error('Age must be >= 0!!')
            }
        }
    },
    email: {
        type: String,
        trim: true, // trims the given email
        lowercase: true, // converts to lowercase
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

// NOTE : if any extra field is provided in the input, which is not present in model, it will not throw error, it will be just ignored
const me = new User({
    name: 'Raisa',
    age: 12,
    email: '  ARIFKHAN@gmail.com   ',
    password: '    pass1234   '
})

//to save in db
me.save().then((result) => {
    console.log(result) //it has __v which is version
}).catch((error) => {
    console.log('My error: ', error)
})

//note: collection name is plural of the model name in small letter, eg tasks
const Task = mongoose.model('Task', {
    desc: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

// const task1 = new Task({
//     desc: 'NodeJs Section 11',
//     completed: false
// })

// task1.save().then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })