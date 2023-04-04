const { addTask, getTasks, updateTaskStatus, deleteTask, getTask } = require('../controllers/tasksControllers');
const router = require('express').Router();

router.route('/')
    .get(getTasks)
    .post(addTask)

router.route('/:id')
    .get(getTask)
    .patch(updateTaskStatus)
    .delete(deleteTask)

module.exports = router;