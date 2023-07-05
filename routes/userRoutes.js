const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/', userController.createUser)
// GET all the users
router.get('/', userController.indexUser)
router.post('/login', userController.loginUser)
router.put('/:id', userController.auth, userController.updateUser)
router.delete('/:id', userController.auth, userController.deleteUser)
router.post('/logout', userController.auth, userController.logoutUser)

module.exports = router
