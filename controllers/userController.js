require('dotenv').config()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.auth = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, 'secret')
        const user = await User.findOne({ _id: data._id })
        if(!user){
            throw new Error('bad credentials')
        }
        req.user = user 
        next()
    } catch(error){
        res.status(401).json({ message: error.message })
    }
}

exports.indexUser = async (req, res) => {
    try {
        const foundUsers = await User.find({}) //  Without await, the code would continue executing immediately after calling User.find(), and the users variable would not be assigned the actual result of the query. Using await ensures that the users variable contains the resolved value of the promise returned by User.find(), which in this case is the retrieved user data.
        res.json({users: foundUsers}) // This line sends the retrieved users data as a JSON response. It uses the json() method of the res (response) object to convert the users data into JSON format and send it back to the client.
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        user.loggedIn = false
        res.json({ user, token })
    } catch (error) { 
        res.status(400).json({ message: error.message })
    }
}

exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if(!user || !await bcrypt.compare(req.body.password, user.password)){
            throw new Error('Invalid Login Credentials')
        } else {
            const token = await user.generateAuthToken()
            res.json({ user, token })
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        updates.forEach(update => req.user[update] = req.body[update])
        await req.user.save()
        res.json(user)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        await req.user.deleteOne()
        res.sendStatus(204)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.logoutUser = async (req, res) => {
    try {
      req.user.loggedIn = false
      await req.user.save()
      res.json({message:'User successfully logged out!'})
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }