const router = require('express').Router();
const { addTeam, getTeams, deleteTeam, updateTeam, getTeam, updateSupervisor, updateSupervisorReview,getMeet,addMeet,deleteMeet } = require('../controllers/teamControllers');

router.route('/')
    .get(getTeams)
    .post(addTeam)

router.route('/:id')
    .get(getTeam)
    .delete(deleteTeam)
    .patch(updateTeam)

router.route('/supervisor/:id')
    .patch(updateSupervisor)

router.route('/supervisor/status/:id')
    .patch(updateSupervisorReview)

router.route('/meet/:id')
    .get(getMeet)
    .delete(deleteMeet)
    .post(addMeet)

module.exports = router;