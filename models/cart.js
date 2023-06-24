const { model, Schema } = require('mongoose')

const cartSchema = new Schema ({
    price: { type: Number, required: true },
    totalItems: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
})

const Cart = model('Cart', cartSchema)

module.exports = Cart