const router = require('express').Router();
const { addTeam, getTeams, deleteTeam, updateTeam,getTeam,updateSupervisor,updateSupervisorReview } = require('../controllers/teamControllers');

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

module.exports = router;