// routes/utilesIncomeRoutes.js
const express = require('express');
const router = express.Router();
const UtilesIncome = require('../models/utilesIncome');

// Create Utiles Income Entry
router.post('/utiles', async (req, res) => {
    try {
        const { amount, date, name, description } = req.body;
        const utilesIncome = await UtilesIncome.create({ amount, date, name, description });
        res.json({ success: true, data: utilesIncome });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get All Utiles Income Entries
router.get('/utiles', async (req, res) => {
    try {
        const utilesIncome = await UtilesIncome.findAll();
        res.json({ success: true, data: utilesIncome });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get Utiles Income Entry by ID
router.get('/utiles/:id', async (req, res) => {
    try {
        const utilesID = req.params.id;
        const utilesIncome = await UtilesIncome.findByPk(utilesID);
        if (!utilesIncome) {
            res.status(404).json({ success: false, message: "Utiles income entry not found" });
            return;
        }
        res.json({ success: true, data: utilesIncome });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Update Utiles Income Entry
router.put('/utiles/:id', async (req, res) => {
    try {
        const utilesID = req.params.id;
        const { amount, date, name, description } = req.body;
        const utilesIncome = await UtilesIncome.findByPk(utilesID);
        if (!utilesIncome) {
            res.status(404).json({ success: false, message: "Utiles income entry not found" });
            return;
        }
        utilesIncome.amount = amount;
        utilesIncome.date = date;
        utilesIncome.name = name;
        utilesIncome.description = description;
        await utilesIncome.save();
        res.json({ success: true, message: "Utiles income entry updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Delete Utiles Income Entry
router.delete('/utiles/:id', async (req, res) => {
    try {
        const utilesID = req.params.id;
        const utilesIncome = await UtilesIncome.findByPk(utilesID);
        if (!utilesIncome) {
            res.status(404).json({ success: false, message: "Utiles income entry not found" });
            return;
        }
        await utilesIncome.destroy();
        res.json({ success: true, message: "Utiles income entry deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get Yearly Total Income
router.get('/utiles/yearly-total/:year', async (req, res) => {
    try {
        const year = req.params.year;
        const yearlyTotal = await UtilesIncome.sum('amount', {
            where: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), year)
        });
        res.json({ success: true, data: yearlyTotal || 0 });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get Total Income
router.get('/utiles/total-income', async (req, res) => {
    try {
        const totalIncome = await UtilesIncome.sum('amount');
        res.json({ success: true, data: totalIncome || 0 });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
