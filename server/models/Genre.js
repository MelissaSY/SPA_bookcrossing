'use strict'

const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../services/storage/mysql_sequelize')

class Genre extends Model {}

Genre.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.TEXT('medium'),
    }
}, { sequelize, modelName:'Genre', timestamps: false, })

module.exports = {Genre};