const { Schema, model } = require('mongoose')

const Joi = require('joi')

const jwt = require('jsonwebtoken')

const userSchema = Schema({
    name: {
        type: String,
        required: true,
        maxLength: 100,
        minLength: 3,
    },
    email: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 1024
    },
}, { timestamps: true }

)

userSchema.methods.generateJWT = function () {
    const token = jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
    }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" })
    return token;
}

const validateUser = user => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().min(5).max(255).required(),
        password: Joi.string().min(5).max(255).required(),
    })
    return schema.validate(user)
}

module.exports.User = model('User', userSchema);
module.exports.validate = validateUser;