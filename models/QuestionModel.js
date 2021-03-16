const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
    questioner:{
        type:String, 
        required:true
    },
    questioned_time:{
        type: Date,
        default: Date.now()
    },
    answers:{
        type: Array,
        default:[]
    },
    catogory:{
        type: String,
        required:true
    },
    title:{
        type: String,
        required: true
    },
    detail:{
        type: String,
        maxLength
    }
})


module.exports = mongoose.model('Questions', QuestionSchema)