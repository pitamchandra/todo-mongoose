const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title :{
        type: String,
        required: true,
    },
    description: String,
    status: {
        type: String,
        enum: ['active', 'inactive']
    },
    date: {
        type: Date,
        default: Date.now
    },
    user : {
        type: mongoose.Types.ObjectId,
        ref: "user"
    }
})

todoSchema.statics = {
    findNode : function (){
        return this.find({title: /node/i})
    }
}

todoSchema.query = {
    byLanguage : function(language){
        return this.find({title : new RegExp(language, 'i')})
    }
}

module.exports = todoSchema;