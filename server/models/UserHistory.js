'use strict'

const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../services/storage/mysql_sequelize')

const { Book } = require('./Book');
const { Author } = require('./Author');
const { Genre } = require('./Genre');
const { User } = require('./User')

class UserGenre extends Model {}

class UserAuthor extends Model {}

class UserBook extends Model {}

class EditType extends Model {}


EditType.init({
    name: {
        type: DataTypes.STRING(255),
        primaryKey: true
    }
}, { sequelize, modelName:'UserGenre', timestamps: false, })

EditType.bulkCreate([{
        name: 'edit'
    },{
        name: 'add'
    },{
        name: 'delete'
    }
])

UserBook.init({
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
    }
}, { sequelize, modelName:'UserBook', timestamps: false, })


UserGenre.init({
    GenreId: {
        type: DataTypes.INTEGER,
        references: {
            model: Genre,
            key: 'id'
        }
    },
    UserId: {
        type:DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        }
    }
}, { sequelize, modelName:'UserGenre', timestamps: false, })

UserAuthor.init({
    AuthorId: {
        type: DataTypes.INTEGER,
        references: {
            model: Author,
            key: 'id'
        }
    },
    UserId: {
        type:DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        }
    }
}, { sequelize, modelName:'UserAuthor', timestamps: false, })

