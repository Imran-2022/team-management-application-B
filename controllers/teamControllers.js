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
        console.log(err.message, "err0r");
        return res.send({ error: err.message })
    }

}

module.exports.getTeams = async (req, res) => {
    const teams = await Teams.find({})
    res.send(teams)
}
module.exports.getTeam = async (req, res) => {
    const _id = req.params.id;
    const data = await Teams.find({ _id })
    res.send(data)
}

module.exports.deleteTeam = async (req, res) => {
    const _id = req.params.id;
    const result = await Teams.deleteOne({ _id });
    console.log(result);
    return res.status(200).send(result)
}


module.exports.updateTeam = async (req, res) => {
    const teamId = req.params.id;
    const teamEmail = req.body.email;
    const dt = await Teams.findOne({ _id: teamId })

    const newTeamMembers = dt.teamMembers;
    newTeamMembers.push(teamEmail);
    try {
        const updatedTeam = await Teams.updateOne(
            { _id: teamId },
            { $set: { teamMembers: newTeamMembers } },
            { new: true }
        );

        if (!updatedTeam) {
            return res.status(404).send({ message: 'Team not found' });
        }

        return res.status(200).send(newTeamMembers);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Server error' });
    }
}

