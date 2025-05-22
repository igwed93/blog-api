const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (Sequelize, DataTypes) => {
    const User = Sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });

    // Hash password before saving the user
    User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    });
    
    return User;
};
