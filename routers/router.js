const router = require('express').Router();
const { registerUser, loginUser,verifyEmailRoute } = require('../controllers/userControllers');
const { authorize } = require('../middlewares/authorize');

router.route('/registration')
    .post(registerUser)

router.route('/verify-email')
    .put(verifyEmailRoute)

router.route('/login')
    .post(loginUser)

module.exports = router;