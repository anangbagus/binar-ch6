const router = require("express").Router()
const user_game = require("./user_game.router")
const user_biodata = require("./user_game_biodata.router")
const user_history = require("./user_game_history.router")

router.use("/user_game", user_game)
router.use("/user_biodata", user_biodata)
router.use("/user_history", user_history)

module.exports = router