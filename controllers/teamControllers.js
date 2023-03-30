const bcrypt = require('bcrypt')
const _ = require('lodash');
const { Teams } = require('../models/team');


module.exports.addTeam = async (req, res) => {
    const team = new Teams(req.body);
    console.log(team);

    try {
        const result = await team.save();
        return res.send(result);
    } catch (err) {
        console.log(err.message,"err0r");
        return res.send({error:err.message})
    }

}



module.exports.getTeams = async (req, res) => {
    const teams = await Teams.find({})
    res.send(teams)
}


