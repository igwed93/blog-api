module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });
    return Comment;
};