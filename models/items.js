const { model, Schema } = require('mongoose')

const itemSchema = new Schema ({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: {type: String, required: true},
    quantity: { type: Number, required: true }
})

const Item = model('Item', itemSchema)

module.exports = Item