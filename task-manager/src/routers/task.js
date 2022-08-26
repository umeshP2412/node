const express = require('express')
const router = new express.Router()
const auth = require('../middelware/auth')
const Task = require('../models/task')
const User = require('../models/user')

router.post('/tasks', auth, async (req, res) => {
    // const task = new Task(req.body);
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
        
    } catch (error) {
        res.status(400).send(error)
    }
})

// GET tasks?completed=true
// GET task?limit=10&skip=10
// GET task?sortBy=createdAt:asc
router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}

    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'asc' ? 1 : -1 
    }

    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }

    try {
        const user = await User.findById(req.user._id)
        const tasksArr = await user.populate({ 
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        })
        // console.log(tasksArr.tasks)
        // console.log(user)
        res.send(tasksArr.tasks)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/tasks/:id', auth, async (req,res) => {
    const _id = req.params.id;

    try {
        // const result = await Task.findById(_id)
        const result = await Task.findOne({ _id, owner: req.user._id })
        if(!result){
            return res.status(404).send()
        }

        res.send(result)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'comepleted']
    const isvalidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if(!isvalidOperation){
        return res.return(400).send({error: 'Invalid updates!'})
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id})
        // const task = await Task.findById(req.params.id)

        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

        if(!task){
            return res.status(404).send()
        }

        updates.forEach((update) => {
            task[update] = req.body[update]
        })
        await task.save()

        res.send(task)
    } catch (error) {
        res.status(400).send(error)
    }
        
    
})

router.delete('/tasks/:id', auth, async (req, res) => {
    
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id})
    
        if(!task){
            return res.status(404).send()
        }
        
        res.send(task)

    } catch (error) {
         res.status(500).send(error)
    }
})

module.exports = router