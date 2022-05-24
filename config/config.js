const { Sequelize } = require('sequelize')
const sequelize = new Sequelize(
    "game_development",
    "postgres",
    "bagusqwer",
    {
        host: "127.0.0.1",
        dialect: "postgres"
    }
)

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user_game = require('../models/user_game.model')(sequelize, Sequelize)
db.user_game_history = require('../models/user_game_history.model')(sequelize, Sequelize)
db.user_game_biodata = require('../models/user_game_biodata.model')(sequelize, Sequelize)

//association user_game
db.user_game.hasMany(db.user_game_history, {foreignKey: {name: 'userGameUserId', allowNull: false}})
db.user_game.hasOne(db.user_game_biodata, {foreignKey: {name: 'userGameUserId', allowNull: false}})

//assoctiation user_game_biodata
db.user_game_biodata.belongsTo(db.user_game)

//association user_game_history
db.user_game_history.belongsTo(db.user_game)

module.exports = db
