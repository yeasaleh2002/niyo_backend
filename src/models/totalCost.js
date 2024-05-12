// models/UserMonthSubscription.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

// Define the TotalCost model
const TotalCost = sequelize.define('totalCost', {
    costId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descriptions: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'totalCost',
    timestamps: true,
    underscored: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = TotalCost;
