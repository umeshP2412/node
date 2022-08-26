const express = require('express')
const router = new express.Router()
const auth = require('../middelware/auth')
const User = require('../models/user')
const multer = require('multer')
const sharp = require('sharp')


router.post('/users' , async (req, res) => {
    const user = new User(req.body)
    
    try {
        await user.save()
        
        const token = await user.generateAuthToken()
        
        console.log({user, token})
        res.status(201).send({user, token})
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/user/login', async (req, res) => {
    try {
        
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        
        res.send( {user, token})
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/user/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((tokenObj) => {return tokenObj.token !== req.token})
        await req.user.save()

        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/users/logoutall', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        
        req.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/users/me', auth, async (req, res) => {
    
    res.send(req.user)
    
})

router.patch('/users/me', auth, async (req, res) => {
    
    const updates= Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'age', 'password']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })
    
    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates!'})
    }
    
    try {
        
        updates.forEach(update => {
            req.user[update] = req.body[update]
        });
        
        await req.user.save()
        
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        
        res.send(req.user)
    } catch (error) {
        res.status(400).send(error)
    }
    
}
)

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
        
    } catch (error) {
        res.status(500).send(error)
    }
})

const upload = multer({
    limits:{
        fileSize: 1000000
    },
    fileFilter(req, file, callback){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return callback(new Error('Please provide jpg, jpeg or png'))
        }
        callback(undefined, true)
    }
})

router.post('/user/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    try {
        const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 350 }).png().toBuffer()

        req.user.avatar = buffer
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

router.delete('/user/me/avatar', auth, async (req, res) => {
    try {
        req.user.avatar = undefined
        await req.user.save()
        res.send()
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.get('/user/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if(!user || !user.avatar){
            throw new Error('')
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)

    } catch (error) {
        res.status(404).send()
    }
})

module.exports = router