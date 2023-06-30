require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    loggedIn: Boolean,
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cart'}] // don't need require because when they start make a user they are not going to have any items in their cart
})

userSchema.pre('save', async function(next){ // before we finish saving
    this.isModified('password')? 
    this.password = await bcrypt.hash(this.password, 8):
    null;
    next()
})

userSchema.methods.generateAuthToken = async function(){
    this.loggedIn = true
        await this.save()
    const token = jwt.sign({ _id: this._id }, 'secret')
    return token
}

const User = mongoose.model('User', userSchema)

module.exports = User