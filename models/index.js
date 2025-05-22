const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        port: process.env.DB_PORT,
        logging: false,
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


// Import models
db.User = require('./user.model')(sequelize, Sequelize);
db.Post = require('./post.model')(sequelize, Sequelize);
db.Comment = require('./comment.model')(sequelize, Sequelize);

// Relationships
db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);

db.Post.hasMany(db.Comment);
db.Comment.belongsTo(db.Post);

db.User.hasMany(db.Comment);
db.Comment.belongsTo(db.User);

module.exports = db;