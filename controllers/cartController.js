const User = require('../models/user')
const Item = require('../models/items')
const Cart = require('../models/cart')

// exports.createCart = async (req, res) => {
//     try {
//         const cart = new User(req.body)
//         await user.save()
//         const token = await user.generateAuthToken()
//         res.json({ user, token })
//     } catch (error) { 
//         res.status(400).json({ message: error.message })
//     }
// }

// exports.updateCart = async (req, res) => {
//     try {
//         const updates = Object.keys(req.body)
//         updates.forEach(update => req.user[update] = req.body[update])
//         await req.user.save()
//         res.json(user)
//     } catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// }

// exports.deleteCart = async (req, res) => {
//     try {
//         await req.user.deleteOne()
//         res.sendStatus(204)
//     } catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// }