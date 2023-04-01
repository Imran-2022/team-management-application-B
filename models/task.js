const { Schema, model } = require('mongoose')

const taskSchema = Schema({
    projectName: {
        type: String,
        required: true,
    },
    assignTo: {
        type: String,
        required:true,
    },
    tasks: {
        type: String,
        required: true,
        minLength: 5,
    },
    dateLine:{
        type:String,
        required:true,
    },
    project_Id:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
    }
   
}, { timestamps: true }

)

module.exports.Tasks = model('Tasks', taskSchema);