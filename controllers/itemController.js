const Item = require('../models/items')
const User = require('../models/user')
const Cart = require('../models/cart')

exports.itemIndex = async (req, res) => {
    try {
        const foundItems = await Item.find({});
        res.json(foundItems)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.deleteItem = async (req, res) => {
    try {
        await Item.findOneAndDelete({'_id': req.params.id})
            .then(() => {
                res.redirect('/items')
            })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.updateItem = async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        const item = await Item.findOne({ _id: req.params.id })
        updates.forEach(update => item[update] = req.body[update]) // you are changing the body of the pencil which are the name,price,description, and quantity and THEN updating the item variable so that it changes
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
        await item.save()
        await foundCart.save()
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

