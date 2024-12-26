'use strict';

var express = require('express');
var crmRoute = require('./routes/crmRoute.js');
var mongoose = require('mongoose');
require('dotenv').config();
var app = express();
var port = process.env.PORT || 8000;
var cors = require('cors');
var path = require('path');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: '*', // Replace '*' with your frontend's URL for better security
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use('/uploads', express['static'](path.join(__dirname, 'uploads')));
app.use('/', crmRoute);

mongoose.connect(process.env.MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(function () {
  return console.log('Connected to MongoDB');
})['catch'](function (err) {
  return console.log('MongoDB connection error:', err);
});

app.listen(port, function () {
  console.log('Server is running on http://localhost:' + port);
});