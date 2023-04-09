'use strict'

const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../services/storage/mysql_sequelize')

class Author extends Model {}
class Pseudonym extends Model {}

Pseudonym.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    pseudonym: {
        type: DataTypes.TEXT('medium'),

    }
}, { sequelize, modelName:'Pseudonym', timestamps: false, })

Author.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.TEXT('medium'),

    },
    surname: {
        type: DataTypes.TEXT('medium'),

    },
    patronymic: {
        type: DataTypes.TEXT('medium'),

    }
}, { sequelize, modelName:'Author', timestamps: false, })

Author.hasMany(Pseudonym, {
    foreignKey: 'authorId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

//Pseudonym.belongsTo(Author);

module.exports = {Author, Pseudonym};