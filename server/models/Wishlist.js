'use strict'

const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../services/storage/mysql_sequelize')
const { UserBook, User } = require("./User");
const { Book } = require('./Book');

class Wishlist extends Model {}

Wishlist.init({
    fulfilled: {
       type: DataTypes.BOOLEAN
    }
}, {sequelize, timestamps: false})

UserBook.hasOne(Wishlist, {
    foreignKey: {
        name: 'UserBookId'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
Wishlist.belongsTo(UserBook);

UserBook.addHook('afterCreate', (userBook, options) => {
    if(userBook.ListType === 0) {
        Wishlist.create({
            UserBookId: userBook.id,
            fulfilled: false
        })
    }
})

User.addScope('wishlist', {
    attributes: ['id'],
    include: [{ 
        model: UserBook,
        attributes: ['UserId', 'BookId'],
        where: {
            ListType: 0
            },
            include: [{
                model: Book,
            }, {
                model: Wishlist,
                attributes:['fulfilled'],
            }]
            
        },
    ]
})

User.addScope('wishlist_bookId', bookId => ({
    attributes: ['id'],
    include: [{ 
        model: UserBook,
        attributes: ['UserId', 'BookId'],
        where: {
            ListType: 0,
            BookId: bookId
            },
            include: [{
                model: Book,
            }, {
                model: Wishlist,
                attributes:['fulfilled'],
            }]
            
        },
    ]
    })
)

User.addScope('fulfilled', fulfilled => ({
    attributes: ['id'],
    include: [{ 
        model: UserBook,
        attributes: ['UserId', 'BookId'],
        where: {
            ListType: 0,
            },
            include: [{
                model: Book,
            }, {
                model: Wishlist,
                attributes:['fulfilled'],
                where: {
                    fulfilled: fulfilled
                }
            }]
            
        },
    ]
    })
)

module.exports = { Wishlist }