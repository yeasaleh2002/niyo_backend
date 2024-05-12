const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Payment = sequelize.define('Payment', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    monthly_fee: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    payment_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Payment;
