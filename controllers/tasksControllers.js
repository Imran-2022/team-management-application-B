const bcrypt = require('bcrypt')
const _ = require('lodash');
const { Tasks } = require('../models/task');

module.exports.getTasks = async (req, res) => {
    const tasks = await Tasks.find({})
    res.send(tasks)
}
module.exports.getTask = async (req, res) => {
    const id=req.params.id
    const task = await Tasks.find({_id:id})
    console.log(task);
    // res.send(task)
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

module.exports.updateTaskStatus = async (req, res) => {
    const id=req.params.id;
    const updateStatus=req.body.status;
    const result = await Tasks.updateOne({_id:id}, { status:updateStatus})
    
    if(result.modifiedCount>0){
       return res.send(req.body)
    }
}
module.exports.deleteTask = async (req, res) => {
    const id=req.params.id;
    const result = await Tasks.deleteOne({_id:id})
    // console.log(result);
    if(result.deletedCount){
        res.send({message:"delected Successfully !"})
    }
}
