const bcrypt = require('bcrypt')
const _ = require('lodash')
const { validate, User } = require('../models/user')

module.exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const { error } = validate({ name, email, password });
    if (error) return res.status(400).send(error.details[0].message);

    let user = {};

    user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already Registered');
    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const solt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, solt);
    const token = user.generateJWT();

    try {
        const result = await user.save();
        return res.status(201).send({
            message: "registration successfull",
            token: token,
            user: _.pick(result, ['name', 'email'])
        })

    } catch (error) {
        return res.status(500).send("something Failed !")
    }
}


module.exports.loginUser = async (req, res) => {

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password");
    const validUser = await bcrypt.compare(req.body.password, user.password);
    if (!validUser) return res.status(400).send("Invalid email or password");
    const token = user.generateJWT();

    return res.status(200).send({
        message: "login successfull",
        token: token,
        user: _.pick(user, ['name', 'email'])
    })
}
