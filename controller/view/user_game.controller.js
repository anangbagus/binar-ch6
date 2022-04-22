const {user_game} = require('../../config/config')

const readAll = async (req, res) => {
    try {
        const data = await user_game.findAll()
        res.render("user_game/readAll", {data})
    } catch (error) {
        console.log(error)
    }
}

module.exports = {readAll}