// routes/userMonthSubscriptionRoutes.js
const express = require('express');
const MonthSubscription = require('../models/UserMonthSubscription');

const router = express.Router();

// GET all month subscriptions
router.get('/monthsubscriptions', async (req, res) => {
    try {
        const subscriptions = await MonthSubscription.findAll();
        return res.status(200).json(subscriptions);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
});


// GET one month subscription by ID
router.get('/monthsubscriptions/:id', async (req, res) => {
    try {
        const subscription = await MonthSubscription.findByPk(req.params.id);
        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }
        return res.status(200).json(subscription);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
});


// POST create month subscription
router.post('/monthsubscriptions', async (req, res) => {
    try {
        const { user_id, monthly_fee, isActive } = req.body;
        const subscription = await MonthSubscription.create({ user_id, monthly_fee, isActive });
        return res.status(201).json({ message: 'Subscription created successfully', subscription });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
});


// PUT update month subscription by ID
router.put('/monthsubscriptions/:id', async (req, res) => {
    try {
        const { user_id, monthly_fee, isActive } = req.body;
        const subscription = await MonthSubscription.findByPk(req.params.id);
        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }
        await subscription.update({ user_id, monthly_fee, isActive });
        return res.status(200).json({ message: 'Subscription updated successfully', subscription });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
});


// DELETE month subscription by ID
router.delete('/monthsubscriptions/:id', async (req, res) => {
    try {
        const subscription = await MonthSubscription.findByPk(req.params.id);
        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }
        await subscription.destroy();
        return res.status(200).json({ message: 'Subscription deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
});


module.exports = router;
