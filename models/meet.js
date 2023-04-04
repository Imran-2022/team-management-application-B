const { Schema, model } = require('mongoose')

const meetSchema = Schema({
    scheduleNow: {
        type: String,
        required: true,
    },
    project_id:{
        type: String,
        required: true,
    }
   
}, { timestamps: true }

)

module.exports.Meet = model('meet', meetSchema);