const bcrypt = require('bcrypt')
const _ = require('lodash');
const { Teams } = require('../models/team');
const { sendEmail } = require('../utils/sendEmail');
const { Meet } = require('../models/meet');

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
    const data = await Teams.findOne({ _id })
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

        // send mail that you are added !!! please login - 
        // if (updatedTeam) {
        //     try {
        //         await sendEmail({
        //             to: teamEmail,
        //             from: 'mdimranulhaque202@gmail.com',
        //             subject: 'you are added into a team named please login to see more -  !',
        //             html: `web url - ${`https://team-management-application.netlify.app/`}`,
        //         })
        //     } catch (err) {
        //         console.log(err);
        //         res.sendStatus(500);
        //     }
        // }

        return res.status(200).send(newTeamMembers);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Server error' });
    }
}
module.exports.updateSupervisor = async (req, res) => {
    const teamId = req.params.id;
    const newSupervisorEmail = req.body.email;
    const dt = await Teams.findOne({ _id: teamId })

    const newSupervisor = dt.supervisor;
    newSupervisor.push(newSupervisorEmail);
    try {
        const updatedTeam = await Teams.updateOne(
            { _id: teamId },
            { $set: { supervisor: newSupervisor } },
            { new: true }
        );
        if (!updatedTeam) {
            return res.status(404).send({ message: 'Team not found' });
        }
        return res.status(200).send(newSupervisor);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Server error' });
    }
}
module.exports.updateSupervisorReview = async (req, res) => {
    const teamId = req.params.id;
    const dt = req.body;
    // console.log(teamId,dt);
    try {
        const updatedTeam = await Teams.findOneAndUpdate({ _id: teamId }, { review: dt.review });
        if (!updatedTeam) {
            return res.status(404).send({ message: 'Team not found' });
        }
        return res.status(200).send(dt);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Server error' });
    }
}
module.exports.addMeet = async (req, res) => {
    const teamId = req.params.id;
    const dt = req.body;
    // console.log(teamId,dt);
    const meet = new Meet({ scheduleNow: dt.scheduleNow, project_id: teamId });
    // console.log(meet);
    try {
        const result = await meet.save();
        return res.send(result);
    } catch (err) {
        console.log(err.message, "err0r");
        return res.send({ error: err.message })
    }

}
module.exports.getMeet = async (req, res) => {
    const _id = req.params.id;
    const data = await Meet.findOne({ project_id: _id })
    res.send(data)
}

module.exports.deleteMeet = async (req, res) => {
    const _id = req.params.id;

    try {
        const data = await Meet.findOneAndDelete({ project_id: _id });
        if (!data) {
            return res.status(404).send("Data not found");
        }
        res.send(data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};