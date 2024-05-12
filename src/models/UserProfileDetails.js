// models/UserProfileDetails.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const UserProfileDetails = sequelize.define('userProfiledetails', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nickname: DataTypes.STRING,
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fathersName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    profession: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: DataTypes.STRING,
    village: {
        type: DataTypes.STRING,
        allowNull: false
    },
    policeStation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    district: {
        type: DataTypes.STRING,
        allowNull: false
    },
    division: {
        type: DataTypes.STRING,
        allowNull: false
    },
    currentAddress: DataTypes.STRING,
    permanentAddress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    photoUrl: DataTypes.STRING,
    termsAndCondition: DataTypes.BOOLEAN
}, {
    tableName: 'UserProfileDetails',
    timestamps: true, // Enable timestamps
    createdAt: 'created_at', // Rename createdAt column to created_at
    updatedAt: 'updated_at' // Rename updatedAt column to updated_at
});

module.exports = UserProfileDetails;

