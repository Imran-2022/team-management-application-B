const { Schema, model } = require('mongoose')

const teamSchema = Schema({
    teamName: {
        type: String,
        required: true,
        maxLength: 100,
        minLength: 3,
        unique: true,
    },
    teamDetails: {
        type: String,
        required: true,
        minLength: 15,
        maxLength: 1024,
    },
    teamColor: {
        type: String,
        required: true,
        maxLength: 32
    },
    teamMembers:{
        type:Array
    }
   
}, { timestamps: true }

)

module.exports.Teams = model('Teams', teamSchema);