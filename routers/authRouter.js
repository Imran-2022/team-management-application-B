const router = require('express').Router();
const { registerUser, loginUser, verifyEmailRoute, ForgotPasswordRoute, resetPasswordRoute, getUser } = require('../controllers/userControllers');
const { authorize } = require('../middlewares/authorize');

router.route('/registration')
    .post(registerUser)

router.route('/user')
    .get(getUser)

router.route('/verify-email')
    .put(verifyEmailRoute)

router.route('/login')
    .post(loginUser)

router.route('/forgot-password/:email')
    .put(ForgotPasswordRoute)

router.route('/:passwordResetCode/reset-password')
    .put(resetPasswordRoute)

module.exports = router;