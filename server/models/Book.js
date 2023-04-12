'use strict'

const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../services/storage/mysql_sequelize')

const { Author } = require('../models/Author');
const { Genre } = require('../models/Genre');


class Book extends Model {}

class BookAuthor extends Model {}

class BookGenre extends Model {}

Book.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.TEXT('medium'),
    },
    isbn: {
        type: DataTypes.STRING(13),
    },
    annotation: {
        type: DataTypes.TEXT('long'),
    },
    hasCover: {
        type: DataTypes.BOOLEAN
    },
    coverPath: {
        type: DataTypes.TEXT('medium'),
    }
}, { sequelize, modelName:'Book', timestamps: false, })


BookAuthor.init({
    BookId: {
        type: DataTypes.INTEGER,
        references: {
            model: Book,
            key: 'id'
        }
    },
    AuthorId: {
        type:DataTypes.INTEGER,
        references: {
            model: Author,
            key: 'id',
        }
    }
}, { sequelize, modelName:'BookAuthor', timestamps: false, })

BookGenre.init({
    BookId: {
        type: DataTypes.INTEGER,
        references: {
            model: Book,
            key: 'id'
        }
    },
    GenreId: {
        type:DataTypes.INTEGER,
        references: {
            model: Genre,
            key: 'id',
        }
    }
}, { sequelize, modelName:'BookGenre', timestamps: false, })

Book.belongsToMany(Author, {
    through: BookAuthor
})

Book.belongsToMany(Genre, {
    through: BookGenre
})

Author.belongsToMany(Book, {
    through: BookAuthor
})

Genre.belongsToMany(Book, {
    through: BookGenre
})


module.exports = {Book, BookAuthor, BookGenre};