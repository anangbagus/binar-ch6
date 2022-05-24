const { Sequelize } = require('sequelize')
const sequelize = new Sequelize(
    "d7il7qkivuhpo2",
    "zdayaiolglobxp",
    "a5cd47f815a17a5da1a488d503eb6088df06ddcfe7cefe3431d59c4f5bb949f1",
    {
        host: "ec2-52-86-115-245.compute-1.amazonaws.com",
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
