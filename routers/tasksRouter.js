const { addTask,getTasks } = require('../controllers/tasksControllers');
const router = require('express').Router();

router.route('/')
    .get(getTasks)
    .post(addTask)

module.exports = router;