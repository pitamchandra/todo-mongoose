const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const todoSchema = require('../Schemas/todoSchema');

const Todo = new mongoose.model('todo', todoSchema);


// get todos
router.get('/', async (req, res) => {
    // res.send("lala")
})
// get todos by id
router.get('/:id', async (req, res) => {

})
// post todos
router.post('/', async (req, res) => {
    const newTodo = new Todo(req.body)
    newTodo.save((err) => {
        if(err){
            res.status(500).json({
                status: "failed",
                message: err.message
            })
        }else{
            res.status(201).json({
                status: 'success',
                message: "data insert done."
            })
        }
    })
})
// post todos many
router.post('/all', async (req, res) => {

})
// put todos
router.put('/:id', async (req, res) => {

})
// delete todos
router.delete('/:id', async (req, res) => {

})

module.exports = router