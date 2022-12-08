const mongoose = require('mongoose');
const jwt =require('jsonwebtoken')


const userSchema = mongoose.Schema({
    number:{
        type:String,
        required:true
    },
    
},{ timestamps : true})

userSchema.methods.generateJWT = function(){
    const token=jwt.sign({
        _id:this._id,
        number:this.number
    }, process.env.JWT_KEY,{expiresIn: "2d"})

    return token;
}

module.exports.User = mongoose.model('User',userSchema);