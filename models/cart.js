const { model, Schema } = require('mongoose')

const cartSchema = new Schema ({
    totalItems: { type: Number, default: 0, required: true },
    totalPrice: {type: Number, default: 0, required: true},
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
})

const Cart = model('Cart', cartSchema)

module.exports = Cart