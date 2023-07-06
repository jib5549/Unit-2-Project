const { model, Schema } = require('mongoose')
const mongoose = require('mongoose')

const itemSchema = new Schema ({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: {type: String, required: true},
    quantity: { type: Number, required: true },
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cart'}]
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item