// models/UserMonthSubscription.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const UserMonthSubscription = sequelize.define('UserMonthSubscription', {
    subscriptionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    monthlyFee: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'UserMonthSubscription',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = UserMonthSubscription;
