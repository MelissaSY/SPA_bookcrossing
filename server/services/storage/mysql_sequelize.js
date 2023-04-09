'use strict'

const {Sequelize, Op, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('sybookcrossing', 'root', '0852369QSC(', {
    dialect: 'mysql',
    host: 'localhost',
    logging: false,
});

module.exports = {sequelize};
