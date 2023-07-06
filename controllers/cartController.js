const User = require('../models/user')
const Item = require('../models/items')
const Cart = require('../models/cart')

exports.deleteCart = async(req, res) => {
    try {
        const cart = await Cart.findOneAndDelete({ _id: req.params.id })
        res.sendStatus(204)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// exports.updateCart = async(req,res) => {
//     try {
//         const cart = await Cart[Item].findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }); // findOneAndUpdate automatically saves it
//         res.json(cart)
//     } catch (error) {
//        res.status(400).json({ message: error.message }) 
//     }
// }

exports.updateCart = async(req, res) => {
    try {
        const updates = Object.keys(req.body)
        const cart = await Cart.findOne({ _id: req.params.id })
        const item = await Item.findOne({ _id: req.params.id })
        console.log(cart.items);
        updates.forEach(update => item[update] = req.body.quantity[update])
        await item.save()
        res.json(cart)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

// exports.updateCart = async (req, res) => {
//     try {
//       const updates = Object.keys(req.body);
//       const cart = await Cart.findOne({ _id: req.params.id });
//       updates.forEach(update => {cart.set(update, req.body[update]);
//       });
//       await cart.save();
//       res.json(cart);
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   };

exports.createCart = async(req, res) => {
    try {
        req.body.user = req.user._id
        const cart = await Cart.create(req.body)
        req.user.cart?
        req.user.cart.addToSet({ _id: cart._id }):
        req.user.cart = [{ _id: cart._id }]
        await req.user.save()
        res.json(cart)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.showCart = async(req, res) => {
    try {
        const cart = await Cart.findOne({ _id: req.params.id })
        res.json(cart)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.cartIndex = async (req, res) => {
    try {
        const foundCarts = await Cart.find({})
        .populate("items") // this allows Postman to show the individual items inside the cart rather than showing just the ids of the items inside the cart
        res.json(foundCarts)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

