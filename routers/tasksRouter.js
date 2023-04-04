const { addTask, getTasks,updateTaskStatus,deleteTask } = require('../controllers/tasksControllers');
const router = require('express').Router();

router.route('/')
    .get(getTasks)
    .post(addTask)

router.route('/:id')
    .patch(updateTaskStatus)
    .delete(deleteTask)

module.exports = router;