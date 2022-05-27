const { Sequelize } = require('sequelize')
const sequelize = new Sequelize(
    "df822td82khvh9",
    "qfddtdcclrdmzi",
    "1830ce8deba94a269f8899ce4a5f6afbd9074a570e97730a7e26e1aad5fec757",
    {
        host: "ec2-99-80-170-190.eu-west-1.compute.amazonaws.com",
        dialect: "postgres",
        "dialectOptions": { 
            "ssl": {  
              "require": true, 
              "rejectUnauthorized": false 
            }
        }
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
