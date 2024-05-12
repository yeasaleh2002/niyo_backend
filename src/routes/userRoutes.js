// src/routes/userRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const UserProfileDetails = require('../models/UserProfileDetails');
const MonthSubscription = require('../models/UserMonthSubscription');


const router = express.Router();


const secretKey = '3fb0ddd57c6b29a4db72bf146d25ca60bbeb5ab3cb68dc8eaa4ffd90a9fd11b3';
const refreshSecretKey = '1931d6d35264c0ef126373eec2a2846cdace14eae18288195067d30fff65cf32';


// Register endpoint
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create user
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            role: 'user', // Assuming role is 'user' by default
            user_type: 'user' // Example value, adjust as needed
        });
        // Omit the password from the returned user object
        const { password: omitPassword, ...userData } = user.toJSON();
        return res.status(201).json({ message: 'User registered successfully', user: userData });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'Username or email already exists' });
        }
        return res.status(500).json({ message: error.message });
    }
});

// Signin endpoint
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        // Update last login time
        await user.update({ last_login: new Date() });
        // Create and send token with user ID and role
        const token = jwt.sign({ userId: user.user_id, role: user.role }, secretKey, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ userId: user.user_id, role: user.role }, refreshSecretKey);
        return res.status(200).json({ token, refreshToken, role: user.role });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
});

// Refresh token endpoint
router.post('/refresh-token', (req, res) => {
    const refreshToken = req.body.refreshToken;
    // Check if refreshToken exists
    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token is required' });
    }
    try {
        // Verify refreshToken
        const decoded = jwt.verify(refreshToken, refreshSecretKey);
        // Create new accessToken
        const accessToken = jwt.sign({ userId: decoded.userId, role: decoded.role }, secretKey, { expiresIn: '1h' });
        return res.status(200).json({ accessToken });
    } catch (error) {
        console.error(error);
        return res.status(403).json({ message: 'Invalid refresh token' });
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
});

// Get one user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
});

// Update user
router.put('/:id', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.update({ username, email, password: hashedPassword });
        return res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
});

// Delete user
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Delete related records from other tables
        await UserProfileDetails.destroy({ where: { user_id: req.params.id } });
        await MonthSubscription.destroy({ where: { user_id: req.params.id } });
        // Delete user
        await user.destroy();
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
});


module.exports = router;
