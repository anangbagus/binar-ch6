const router = require("express").Router()
const controller = require('../../controller/user_game.controller')

router.get('/', controller.readAll)
router.get('/:id', controller.readById)
router.post('/', controller.createUser)
router.put('/:id', controller.updateUser)
router.delete('/:id', controller.deleteUser)

module.exports = router