const router = require('express').Router();
const { addTeam,getTeams } = require('../controllers/teamControllers');

router.route('/')
    .get(getTeams)
    .post(addTeam)


module.exports = router;