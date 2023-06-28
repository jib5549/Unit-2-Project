const express = require('express')
const morgan = require('morgan')
const cartRoutes = require('./routes/cartRoutes')
const userRoutes = require('./routes/userRoutes')
const itemRoutes = require('./routes/itemRoutes')
const app = express()

app.use(express.json())
app.use(morgan('combined'))
app.use('/users', userRoutes)
app.use('/cart', cartRoutes)
app.use('/items', itemRoutes)


module.exports = app