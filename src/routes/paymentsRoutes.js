const express = require('express');
const router = express.Router();
const Payment = require('../models/payment');
const { Op } = require('sequelize');

// 1. Create a payment
router.post('/payments', async (req, res) => {
    try {
        const payment = await Payment.create(req.body);
        res.status(201).json(payment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 2. Get all payments (pagination)
router.get('/payments', async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;
        const payments = await Payment.findAndCountAll({
            limit: parseInt(limit),
            offset: offset
        });
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 3. Get one payment
router.get('/payments/:id', async (req, res) => {
    try {
        const payment = await Payment.findByPk(req.params.id);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 4. Update one payment
router.patch('/payments/:id', async (req, res) => {
    try {
        const payment = await Payment.findByPk(req.params.id);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        await payment.update(req.body);
        res.status(200).json(payment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 5. Delete a payment
router.delete('/payments/:id', async (req, res) => {
    try {
        const payment = await Payment.findByPk(req.params.id);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        await payment.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 6. Get monthly total payment
router.get('/payments/monthly-total', async (req, res) => {
    try {
        const monthlyTotal = await Payment.sum('amount', {
            where: {
                payment_date: {
                    [Op.gte]: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                    [Op.lt]: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
                }
            }
        });
        res.status(200).json({ monthlyTotal });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 7. Get the monthly total for a user payment
router.get('/payments/:user_id/monthly-total', async (req, res) => {
    try {
        const monthlyTotal = await Payment.sum('amount', {
            where: {
                user_id: req.params.user_id,
                payment_date: {
                    [Op.gte]: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                    [Op.lt]: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
                }
            }
        });
        res.status(200).json({ monthlyTotal });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 8. Get yearly total payment for all users
router.get('/payments/yearly-total', async (req, res) => {
    try {
        const yearlyTotal = await Payment.sum('amount', {
            where: {
                payment_date: {
                    [Op.gte]: new Date(new Date().getFullYear(), 0, 1),
                    [Op.lt]: new Date(new Date().getFullYear(), 11, 31)
                }
            }
        });
        res.status(200).json({ yearlyTotal });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 9. Get yearly total payment for a user
router.get('/payments/:user_id/yearly-total', async (req, res) => {
    try {
        const yearlyTotal = await Payment.sum('amount', {
            where: {
                user_id: req.params.user_id,
                payment_date: {
                    [Op.gte]: new Date(new Date().getFullYear(), 0, 1),
                    [Op.lt]: new Date(new Date().getFullYear(), 11, 31)
                }
            }
        });
        res.status(200).json({ yearlyTotal });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 10. Get total payment from date to date
router.get('/payments/total-from-to', async (req, res) => {
    try {
        const { from, to } = req.query;
        const total = await Payment.sum('amount', {
            where: {
                payment_date: {
                    [Op.gte]: from,
                    [Op.lte]: to
                }
            }
        });
        res.status(200).json({ total });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 11. Get the total amount from the payment
router.get('/payments/total-amount', async (req, res) => {
    try {
        const totalAmount = await Payment.sum('amount');
        res.status(200).json({ totalAmount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
