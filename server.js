const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const todoHandler = require('./routeHandlers/todoHandlers')


const app = express()
const port = process.env.port || 3000

// middleware
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost/todos')
.then(() => console.log("database is connected"))
.catch(err => console.log(err))

// todos handler

app.use('/todo', todoHandler)

// app.get('/', async (req, res) => {
//     res.send(`the server is running.........`);
// })

app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
})