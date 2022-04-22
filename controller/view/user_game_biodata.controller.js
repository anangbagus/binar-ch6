const {user_game_biodata} = require('../../config/config')

const readAll = async (req, res) => {
    try {
        const data = await user_game_biodata.findAll()
        res.render("user_biodata/readAll", {data})
    } catch (error) {
        console.log(error)
    }
}

module.exports = {readAll}