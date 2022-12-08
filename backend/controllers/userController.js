const bcrypt = require("bcrypt");
const _ = require('lodash');
const axios = require("axios");
const otpGenerator = require("otp-generator");

const { User } = require('../models/usermodel');
const { Otp } = require('../models/otpmodel');
const { model } = require('mongoose');

module.exports.signUp = async (req,res)=>{

    const user = await User.findOne({
        number: req.body.number
    });

    if(user) return res.status(400).send("User already registered!");

    const OTP = otpGenerator.generate(6,{
        digits:true, alphabets:false,upperCase:false,specialChars:false
    });

    const number = req.body.number;
    // console.log(OTP);
    
    const otp = new Otp({ number: number, otp: OTP });

    const salt = await bcrypt.genSalt(10);
    otp.otp = await bcrypt.hash(otp.otp,salt);

    const result = await otp.save();
    return res.status(200).send(`Otp send successfully OTP: ${OTP}`);
}

module.exports.verifyOtp = async (req,res)=>{
 const optHolder = await Otp.find({
    number: req.body.number
 });

 if(optHolder.length === 0) return res.status(400).send("You use an Expired OTP!");

 const rightOtpFind = optHolder[optHolder.length-1];
 const validUser = await bcrypt.compare(req.body.otp,rightOtpFind.otp);

 if(rightOtpFind.number === req.body.number && validUser){
    
    const user = new User(_.pick(req.body,["number"]));
    const token = user.generateJWT();
    const result = await user.save();
    const OTPDelete = await Otp.deleteMany({number:rightOtpFind.number});

    return res.status(200).send({
        message: "User Registration Successful",
        token:token,
        data:result
    })

 }else{
    return res.status(400).send("Your OTP was wrong");
 }
}
