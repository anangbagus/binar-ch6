const router = require("express").Router()
const controller = require('../../controller/view/user_game_history.controller')

router.get('/', controller.readAll)
// router.get('/:id', controller.readById)
// router.post('/', controller.createHist)
// router.post('/:id', controller.updateHist)
// router.delete('/:id', controller.deleteHist)

module.exports = router