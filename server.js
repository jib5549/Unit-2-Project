require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
// const methodOverride = require('method-override')
const PORT = process.env.PORT || 3000 // if it is not set up for us we will use port 3000 "||" means "or"
const app = require('./app')


mongoose.connect(process.env.MONGO_URI) // this is connecting to the MongoDB database that we named in the .env files called "fruits"
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
})

app.listen(PORT, () => {
    console.log(`Ayo the port at ${PORT} is lit!`)
})


