module.exports = (sequelize, Sequelize) => {
    return sequelize.define('user_game', {
        user_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        password: {
            type: Sequelize.STRING(50),
            allowNull: false
        }
    })
}