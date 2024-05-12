const express = require('express');
const TotalCost = require('../models/totalCost');

const router = express.Router();

// Create TotalCost record
router.post('/', async (req, res) => {
    try {
        const totalCost = await TotalCost.create(req.body);
        res.json({
            success: true,
            message: 'Total cost record added successfully',
            data: totalCost
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get all TotalCost records
router.get('/', async (req, res) => {
    try {
        const totalCosts = await TotalCost.findAll();
        res.json(totalCosts);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get one TotalCost record by id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const totalCost = await TotalCost.findByPk(id);
        if (totalCost) {
            res.json(totalCost);
        } else {
            res.status(404).json({
                success: false,
                message: 'Total cost record not found'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Update TotalCost record by id
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [updated] = await TotalCost.update(req.body, {
            where: { costId: id }
        });
        if (updated) {
            res.json({
                success: true,
                message: 'Total cost record updated successfully'
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Total cost record not found'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Delete TotalCost record by id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await TotalCost.destroy({
            where: { costId: id }
        });
        if (deleted) {
            res.json({
                success: true,
                message: 'Total cost record deleted successfully'
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Total cost record not found'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get total cost
router.get('/total', async (req, res) => {
    console.log("coming in the total")
    const allCosts = await TotalCost.findAll();

        // If there are no records, return total amount as 0
        if (allCosts.length === 0) {
            return res.json({ total_amount: '0.00' });
        }

        // Convert each amount to a floating-point number and sum them
        const totalAmount = allCosts.reduce((total, cost) => {
            // Parse the amount string to float and add to total
            return total + parseFloat(cost.amount);
        }, 0);

        // Format the total amount to 2 decimal points
        const formattedTotal = totalAmount.toFixed(2);
        console.log("formated total", formattedTotal);
        // return;
    try {
        // Retrieve all cost records
        const allCosts = await TotalCost.findAll();

        // If there are no records, return total amount as 0
        if (allCosts.length === 0) {
            return res.json({ total_amount: '0.00' });
        }

        // Convert each amount to a floating-point number and sum them
        const totalAmount = allCosts.reduce((total, cost) => {
            // Parse the amount string to float and add to total
            return total + parseFloat(cost.amount);
        }, 0);

        // Format the total amount to 2 decimal points
        const formattedTotal = totalAmount.toFixed(2);

        res.json({ total_amount: formattedTotal });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


// Get yearly total cost
router.get('/yearly/:year', async (req, res) => {
    const { year } = req.params;
    try {
        const yearlyTotalCost = await TotalCost.findAll({
            attributes: [
                [sequelize.fn('YEAR', sequelize.col('date')), 'year'],
                [sequelize.fn('ROUND', sequelize.fn('SUM', sequelize.col('amount')), 2), 'total_amount']
            ],
            group: [sequelize.fn('YEAR', sequelize.col('date'))],
            where: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), year)
        });
        res.json(yearlyTotalCost);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


module.exports = router;
