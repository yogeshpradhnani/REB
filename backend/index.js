const express = require('express');
const crmRoute = require('./routes/crmRoute.js');
const mongoose = require('mongoose');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 8000; 
const cors= require('cors');
const path = require('path');
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors({
  origin: '*', // Replace '*' with your frontend's URL for better security
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/', crmRoute);

mongoose.connect(process.env.MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('MongoDB connection error:', err));


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});