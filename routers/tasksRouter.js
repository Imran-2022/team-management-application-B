const { addTask, getTasks,updateTaskStatus } = require('../controllers/tasksControllers');
const router = require('express').Router();

router.route('/')
    .get(getTasks)
    .post(addTask)

router.route('/:id')
    .patch(updateTaskStatus)

module.exports = router;