'use strict'

const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../services/storage/mysql_sequelize')
const { Book } = require('../models/Book');

class User extends Model {}
class UserBook extends Model {}


User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
        type: DataTypes.TEXT('medium'),

    },
    lastName: {
        type: DataTypes.TEXT('medium')
    },
    login: {
        type: DataTypes.TEXT('medium'),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(320),
        allowNull: false,
        unique: true,
        
    },
    password: {
        type: DataTypes.STRING,
    }
}, { sequelize, modelName:'User', timestamps: false, })


/*
0 - wishlist 
*/

UserBook.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    BookId: {
        type: DataTypes.INTEGER,
        references: {
            model: Book,
            key: 'id'
        }
    },
    UserId: {
        type:DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        }
    },
    ListType: {
        type: DataTypes.INTEGER
    }
},  { 
    sequelize,
    modelName:'UserBook'
})

User.belongsToMany(Book, {
    through: UserBook
})

Book.belongsToMany(User, {
    through: UserBook
})

User.hasMany(UserBook)
Book.hasMany(UserBook)
UserBook.belongsTo(Book);
UserBook.belongsTo(User);

User.addScope('all', {
    attributes: ['id'],
    include: {
        model: Book,
        through: {
            attributes: ['ListType']
        }
    }
})

module.exports = {User, UserBook};