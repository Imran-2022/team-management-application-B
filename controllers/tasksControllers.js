const bcrypt = require('bcrypt')
const _ = require('lodash');
const { Tasks } = require('../models/task');


module.exports.getTasks = async (req, res) => {
    const tasks = await Tasks.find({})
    res.send(tasks)
}

module.exports.addTask = async (req, res) => {
    // console.log(req.body);
    const task = new Tasks(req.body);
    // console.log(task);
    try {
        const result = await task.save();
        return res.send(result);
    } catch (err) {
        console.log(err.message, "err0r");
        return res.send({ error: err.message })
    }
}