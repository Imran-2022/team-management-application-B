const router = require('express').Router();
const { addTeam, getTeams, deleteTeam, updateTeam,getTeam } = require('../controllers/teamControllers');

router.route('/')
    .get(getTeams)
    .post(addTeam)


router.route('/:id')
    .get(getTeam)
    .delete(deleteTeam)
    .patch(updateTeam)

module.exports = router;