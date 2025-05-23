const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required : true,
            unique: true
        },
        phone: {
            type: Number
        },
        todos: [
            {
                type: mongoose.Types.ObjectId,
                ref: "todo"
            }
        ]
    }
)

module.exports = userSchema;