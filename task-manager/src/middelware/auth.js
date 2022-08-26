const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisismynewtoken')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token})

        if(!user){
            // console.log('no user found')
            throw new Error()
        }
        // console.log('user set to req usr')

        req.token = token
        req.user = user

        next()
    } catch (error) {
        console.log('catch block executed')
        res.status(401).send({error: 'Please authenticate'})
    }
    // next()
}

module.exports = auth