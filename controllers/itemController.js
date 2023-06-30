const Item = require('../models/items')
const User = require('../models/user')
const Cart = require('../models/cart')

exports.itemIndex = async (req, res) => {
    try {
        const foundItems = await Item.find({})
        res.json({items: foundItems})
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.deleteItem = async (req, res) => {
    try {
        const item = await Item.findOne({ _id: req.params.id })
        await item.deleteOne()
        // splice the item so it also gets deleted from the cart
        res.sendStatus(204)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.updateItem = async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        const item = await Item.findOne({ _id: req.params.id })
        updates.forEach(update => req.user[update] = req.body[update])
        await item.save()
        res.json(item)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.createItem = async (req, res) => {
    try {
        const item = new Item(req.body)
        const foundCart = await Cart.findOne({ user: req.user._id })
        foundCart.items?
        foundCart.items.addToSet({ _id: item._id }):
        foundCart.items = [{ _id: item._id }]
        foundCart.totalItems+=item.quantity // increment after each item added
        foundCart.totalPrice+=item.quantity*item.price
        foundCart.totalPrice=foundCart.totalPrice.toFixed(2)
        foundCart.save()
        await item.save()
        // await foundCart.populate('items') // converting the object ID
        res.json({ item, foundCart })
    } catch (error) { 
        res.status(400).json({ message: error.message })
    }
}

exports.showItem = async (req, res) => {
    try {
        const foundItem = await Item.findOne({ _id: req.params.id })
        res.json(foundItem)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

