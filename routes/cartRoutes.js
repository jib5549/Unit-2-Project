const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController')
const userController = require('../controllers/userController')

router.post('/', userController.auth, cartController.createCart)
router.get('/', userController.auth, cartController.cartIndex)
router.put('/:id', userController.auth, cartController.updateCart)
router.delete('/:id', userController.auth, cartController.deleteCart)
router.get('/:id', userController.auth, cartController.showCart)

module.exports = router

