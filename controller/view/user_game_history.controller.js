const {user_game_history} = require('../../config/config')

const readAll = async (req, res) => {
    try {
        const data = await user_game_history.findAll()
        res.render("user_history/readAll", {data})
    } catch (error) {
        console.log(error)
    }
}

module.exports = {readAll}