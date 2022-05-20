module.exports = (sequelize, Sequelize) => {
    return sequelize.define('user_game_biodata', {
        bio_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING(12),
            allowNull: false
        }
    })
}