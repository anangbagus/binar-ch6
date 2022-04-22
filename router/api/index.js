const router = require("express").Router()
const user_game = require("./user_game.router")
const user_game_biodata = require("./user_game_biodata.router")
const user_game_history = require("./user_game_history.router")

router.use("/user_game", user_game)
router.use("/user_biodata", user_game_biodata)
router.use("/user_history", user_game_history)

module.exports = router