const express = require('express')
const router = express.Router()
const itemController = require('../controllers/itemController')
const userController = require('../controllers/userController')

router.post('/', userController.auth, itemController.createItem)
router.get('/:id', userController.auth, itemController.showItem)
router.put('/:id', userController.auth, itemController.updateItem)
router.delete('/:id', userController.auth, itemController.deleteItem)
router.get('/', userController.auth, itemController.itemIndex)

module.exports = router