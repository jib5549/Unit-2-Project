const Item = require('../models/items')
const User = require('../models/user')
const Cart = require('../models/cart')

exports.showIndex = async (req, res) => {
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
        await item.save()
        res.json(item)
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

// exports.addItemCart = async (req, res) => {
//     try {
        
//     } catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// }