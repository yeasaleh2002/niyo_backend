// models/utilesIncome.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const UtilesIncome = sequelize.define('utilesIncome', {
    utilesID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    amount: {
        type: DataTypes.INTEGER
    },
    date: {
        type: DataTypes.DATE
    },
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT
    }
});

module.exports = UtilesIncome;
