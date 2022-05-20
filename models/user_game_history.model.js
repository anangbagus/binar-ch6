module.exports = (sequelize, Sequelize) => {
    return sequelize.define('user_game_history', {
        hist_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        result: {
            type: Sequelize.STRING(10),
            allowNull: false
        }

    })
}