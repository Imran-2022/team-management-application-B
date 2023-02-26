const router = require('express').Router();
const { registerUser, loginUser } = require('../controllers/userControllers');
const { authorize } = require('../middlewares/authorize');

router.route('/registration')
    .post(registerUser)

router.route('/login')
    .post(loginUser)

module.exports = router;