require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/auth');
const profitRoutes = require('./routes/profit');

const app = express();
app.use(express.json());

app.use('/', authRoutes);
app.use('/', profitRoutes);

module.exports = app;