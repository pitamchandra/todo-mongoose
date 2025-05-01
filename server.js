const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const todoHandler = require('./routeHandlers/todoHandlers')
const userHandler = require('./routeHandlers/userHandler')


const app = express()
const port = process.env.port || 3000

// middleware
app.use(cors())
require('dotenv').config()
app.use(express.json())





mongoose.connect('mongodb://localhost/todos')
.then(() => console.log("database is connected"))
.catch(err => console.log(err))

// todos handler

app.use('/todo', todoHandler)
app.use('/user', userHandler)

const errorHandler = (err, req, res, next) => {
    console.log("lala",res.headersSent);
    if(res.headersSent) {
        return next(err)
    }
    res.status(500).json({ error : err})
}

app.use(errorHandler)

// app.get('/', async (req, res) => {
//     res.send(`the server is running.........`);
// })

app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
})