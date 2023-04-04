const { addTask, getTasks, updateTaskStatus, deleteTask, getTask,updateTask } = require('../controllers/tasksControllers');
const router = require('express').Router();

router.route('/')
    .get(getTasks)
    .post(addTask)

router.route('/update/:id')
    .put(updateTask)

router.route('/:id')
    .get(getTask)
    .patch(updateTaskStatus)
    .delete(deleteTask)

module.exports = router;