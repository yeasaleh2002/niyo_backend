// src/routes/userProfileRoutes.js
const express = require('express');
const UserProfileDetails = require('../models/UserProfileDetails');

const router = express.Router();

// Create user profile
router.post('/', async (req, res) => {
    console.log("req", req.body)
    try {
        const userProfile = await UserProfileDetails.create(req.body);
        res.status(201).json(userProfile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// Get all user profiles
router.get('/', async (req, res) => {
    try {
        const userProfiles = await UserProfileDetails.findAll();
        res.json(userProfiles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// Get user profile by id
router.get('/:id', async (req, res) => {
    try {
        const userProfile = await UserProfileDetails.findByPk(req.params.id);
        if (!userProfile) {
            return res.status(404).json({ message: 'User profile not found' });
        }
        res.json(userProfile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// Update user profile by id
router.put('/:id', async (req, res) => {
    try {
        const userProfile = await UserProfileDetails.findByPk(req.params.id);
        if (!userProfile) {
            return res.status(404).json({ message: 'User profile not found' });
        }
        await userProfile.update(req.body);
        res.json(userProfile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// Delete user profile by id
router.delete('/:id', async (req, res) => {
    try {
        const userProfile = await UserProfileDetails.findByPk(req.params.id);
        if (!userProfile) {
            return res.status(404).json({ message: 'User profile not found' });
        }
        await userProfile.destroy();
        res.json({ message: 'User profile deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
