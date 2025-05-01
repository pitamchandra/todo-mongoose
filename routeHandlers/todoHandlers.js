const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const todoSchema = require('../Schemas/todoSchema');
const Todo = new mongoose.model('todo', todoSchema);
const checkLogin = require('../middlewares/checkLogin')

// get todos
router.get('/', checkLogin, async (req, res) => {
    try{
        const todo = await Todo.find()
        res.status(200).json({
            status: 'success',
            message: "data fetching successfully.",
            data: todo
        })
    }catch(err){
        res.status(500).json({
            status: "failed",
            message: err.message
        })
    }
})

router.get('/node', checkLogin, async (req, res) => {
    try{
        const todo = await Todo.findNode()
        res.status(200).json({
            status: 'success',
            message: "data fetching successfully.",
            data: todo
        })
    }catch(err){
        res.status(500).json({
            status: "failed",
            message: err.message
        })
    }
})

router.get('/language', async (req, res) => {
    try{
        const byLanguage = await Todo.find().byLanguage('language')
        res.status(200).json({
            status: "success",
            message: "todos fetching successful",
            data: byLanguage
        })
    }catch(err){
        res.status(500).json({
            status: "failed",
            message: err.message
        })
    }
})

// get todos by id
router.get('/:id', async (req, res) => {
    const { id } = req.params
    try{
        const todo = await Todo.findById(id)
        if(todo){
            res.status(200).json({
                status: 'success',
                message: "data getting successfully",
                data: todo
            })
        }else{
            res.status(404).json({
                status: 'failed',
                message: "data not found"
            })
        }
    }catch(err){
        res.status(500).json({
            status: "failed",
            message: err.message
        })
    }
})
// post todos
router.post('/', async (req, res) => {
    const newTodo = new Todo(req.body)
    try{
        await newTodo.save()
        res.status(201).json({
            status: 'success',
            message: "data insert done."
        })
    }catch(err){
        res.status(500).json({
            status: "failed",
            message: err.message
        })
    }
    
})

router.post('/many', async (req, res) => {
    try{
        const newTodos = await Todo.insertMany(req.body)
        res.status(201).json({
            status: 'success',
            message: "Multiple todos inserted successfully.",
            data: newTodos
        })
    }catch(err){
        res.status(500).json({
            status: "failed",
            message: err.message
        })
    }
})
// put todos
router.put('/:id', async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        )
        
        res.status(200).json({
            status: 'success',
            message: "data updated done.",
            data: updatedTodo
        })
        
    } catch (err) {
        res.status(500).json({
            status: "failed",
            message: err.message
        })
    }
})

// delete todos
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try{
        const todo = await Todo.findByIdAndDelete(id)
        if(todo){
            res.status(200).json({
                status: 'success',
                message: "data deleted successfully"
            })
        }else{
            res.status(404).json({
                status: 'failed',
                message: "data not found"
            })
        }
    }catch(err){
        res.status(500).json({
            status: "failed",
            message: err.message
        })
    }
})

module.exports = router