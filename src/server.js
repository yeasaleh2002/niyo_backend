// src/server.js
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();
const userProfileRoutes = require('./routes/userProfileRoutes');
const userMonthSubscriptionRoutes = require('./routes/userMonthSubscriptionRoutes');
const totalCostRoutes = require('./routes/totalCostRoutes');
const utilesIncomeRoutes = require('./routes/utilesIncomeRoutes');
const paymentsRoutes = require('./routes/paymentsRoutes');

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.use('/user', userRoutes);
app.use('/profileDetails', userProfileRoutes);
app.use('/userMonthSubscription', userMonthSubscriptionRoutes);
app.use('/totalCost', totalCostRoutes);
app.use('/', utilesIncomeRoutes);
app.use('/', paymentsRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
