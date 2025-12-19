const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

const adminSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
        default: 'Admin'
    },
    password: {
        type: String,
        select: false
    }
})

adminSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return
    }
    this.password = await bcrypt.hash(this.password,5)
    return 
})
adminSchema.methods.validatePassword = async function (adminpassword) {
    return await bcrypt.compare(adminpassword, this.password)
}

adminSchema.methods.getjwt = function () {
    const token = jwt.sign({
        name: this.name,
        password: this.password
    }, process.env.jwtsecret, { expiresIn: '1hr' })
    return token
}

module.exports = mongoose.model('Admin', adminSchema)