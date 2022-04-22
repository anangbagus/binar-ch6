const router = require("express").Router()
const controller = require('../../controller/user_game_biodata.controller')

router.get('/', controller.readAll)
router.get('/:id', controller.readById)
router.post('/', controller.createBio)
router.put('/:id', controller.updateBio)
router.delete('/:id', controller.deleteBio)

module.exports = router