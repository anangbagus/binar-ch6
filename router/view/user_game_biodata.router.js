const router = require("express").Router()
const controller = require('../../controller/view/user_game_biodata.controller')

router.get('/', controller.readAll)
// router.get('/:id', controller.readById)
// router.post('/', controller.createBio)
// router.post('/:id', controller.updateBio)
// router.delete('/:id', controller.deleteBio)

module.exports = router