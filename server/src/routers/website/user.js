// it will handle all the website's routes'

const express = require('express');
const { generateOtpWeb, registerUser, verifyJwt, loginUser, forgotPassword, resetPassword } = require('../../controller/controllers');
const User = require('../../models/user');


const UserRouter = express.Router();

UserRouter.post('/generate-otp', generateOtpWeb);
UserRouter.post('/register-user', registerUser);
UserRouter.post('/verify-user', verifyJwt);
UserRouter.post('/login-user', loginUser);
UserRouter.post('/forgot-password',forgotPassword);
UserRouter.post('/reset-password', resetPassword);



module.exports = {
    UserRouter
}