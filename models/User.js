const { default: mongoose } = require("mongoose");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const userSchema = mongoose.Schema({
    id: {
        type: String
    },
    name: {
        type: String
    },
    password: {
        type: String,
        select: false
    },
    profilePhoto:{
        type:String
    },
    email: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    dateOfBirth: {
        type: String
    },
    gender: {
        type: String
    },
    address: {
        type: String
    },
    drivingLiscenceNumber: {
        type: String
    },
    drivingLiscenceImg:{
        type:String
    },
    AadharNumber: {
        type: String
    },
    AadharImage: {
        type: String
    },
    price:{
        type:String
    },
    role: {
        type: String,
        default: 'User'
    }
})


userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return 
    }
    this.password = await bcrypt.hash(this.password, 5)
    return 
})

userSchema.methods.validatePassword = async function (userPassword) {
    return await bcrypt.compare(userPassword, this.password)
}


userSchema.methods.getjwt = function () {
  return jwt.sign(
    {
      id: this._id, 
      email: this.email
    },
    process.env.jwtsecret,
    { expiresIn: "1h" }
  );
};


module.exports = mongoose.model('User', userSchema)