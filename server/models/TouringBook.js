'use strict'

const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../services/storage/mysql_sequelize')
const { Book } = require('./Book');

class TouringBook extends Model {}

TouringBook.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    pseudonym: {
        type: DataTypes.TEXT('medium'),

    }
}, { sequelize, modelName:'Pseudonym', timestamps: false, })

TouringBook.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.TEXT('medium'),

    },
}, { sequelize, modelName:'TouringBook', timestamps: false, })

TouringBook.belongsTo(Book, {
    foreignKey: 'bookId',
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
})

module.exports = {TouringBook};