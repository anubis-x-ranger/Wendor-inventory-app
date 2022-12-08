const express = require('express');

const {signUp,verifyOtp}=require('../controllers/userController');

const router = express.Router();


router.post('/signup', signUp);

router.post('/signup/verify', verifyOtp);

module.exports = router;