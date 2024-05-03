const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

//Validate the auth token when user logs in
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '') //note it has "Bearer", hence replace
        const data = jwt.verify(token, 'secret')
        //the below code finds a user with the id, who has the auth token stored
        const user = await User.findOne({ _id: data._id, 'tokens.token': token }) // the jwt token has the id, check the generateAuthToken in userModel

        if (!user) {
            throw new Error()
        }

        req.user = user //since user is already fetched, store it in the req and send to the route handler, no need to fetch again in route handler
        req.token = token
        next()
    } catch (e) {
        console.log(e)
        res.status(401).send({ error: 'User not Authenticated! ' + e.message })
    }
}

module.exports = auth