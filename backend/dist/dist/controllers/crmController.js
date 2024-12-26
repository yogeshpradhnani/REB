'use strict';

var _this = undefined;

var User = require('../models/crmUserModel.js');

exports.registerForm = function callee$0$0(req, res) {
  var _req$body, _name, email, contact, description, nameRegex, emailRegex, contactRegex, existingUser, newUser, registered;

  return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        _req$body = req.body;
        _name = _req$body.name;
        email = _req$body.email;
        contact = _req$body.contact;
        description = _req$body.description;

        if (!(!_name || !email || !contact)) {
          context$1$0.next = 8;
          break;
        }

        return context$1$0.abrupt('return', res.status(400).json({ message: 'All fields are required', success: false }));

      case 8:
        nameRegex = /[a-z]/gi;

        if (_name.match(nameRegex)) {
          context$1$0.next = 11;
          break;
        }

        return context$1$0.abrupt('return', res.status(400).json({ message: 'Name contains only letters', success: false }));

      case 11:
        emailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;

        if (email.match(emailRegex)) {
          context$1$0.next = 14;
          break;
        }

        return context$1$0.abrupt('return', res.status(400).json({ message: 'Invalid email format', success: false }));

      case 14:
        if (!contact) {
          context$1$0.next = 18;
          break;
        }

        contactRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;

        if (contact.match(contactRegex)) {
          context$1$0.next = 18;
          break;
        }

        return context$1$0.abrupt('return', res.status(400).json({ message: 'Invalid contact number format', success: false }));

      case 18:
        context$1$0.next = 20;
        return regeneratorRuntime.awrap(User.findOne({ email: email }));

      case 20:
        existingUser = context$1$0.sent;

        if (!existingUser) {
          context$1$0.next = 23;
          break;
        }

        return context$1$0.abrupt('return', res.status(409).json({ message: 'Email is already Available', success: false }));

      case 23:
        newUser = new User({ name: _name, email: email, contact: contact, description: description });
        context$1$0.next = 26;
        return regeneratorRuntime.awrap(newUser.save());

      case 26:
        registered = context$1$0.sent;

        if (registered) {
          context$1$0.next = 29;
          break;
        }

        return context$1$0.abrupt('return', res.status(500).json({ message: 'Failed to register user', success: false }));

      case 29:

        res.status(201).json({ message: 'User registered successfully', success: true });
        context$1$0.next = 35;
        break;

      case 32:
        context$1$0.prev = 32;
        context$1$0.t0 = context$1$0['catch'](0);

        res.status(500).json({ message: "Something went wrong", success: false });

      case 35:
      case 'end':
        return context$1$0.stop();
    }
  }, null, _this, [[0, 32]]);
};

exports.getAllUser = function callee$0$0(req, res, next) {
  var users, page, limit, startIndex, endIndex, results;
  return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return regeneratorRuntime.awrap(User.find({}));

      case 3:
        users = context$1$0.sent;

        if (users) {
          context$1$0.next = 6;
          break;
        }

        return context$1$0.abrupt('return', res.status(404).json({ message: 'No users found', success: false }));

      case 6:
        page = parseInt(req.query.page) || 1;
        limit = parseInt(req.query.limit) || 10;
        startIndex = (page - 1) * limit;
        endIndex = page * limit;
        results = {};

        results.totalUsers = users.length;
        results.users = users.slice(startIndex, endIndex);
        results.currentPage = page;
        results.nextPage = page + 1 > Math.ceil(users.length / limit) ? undefined : page + 1;
        results.prevPage = page - 1 < 1 ? undefined : page - 1;
        res.status(200).json({ success: true, message: "Data fetched successfully", data: results });

        context$1$0.next = 21;
        break;

      case 19:
        context$1$0.prev = 19;
        context$1$0.t0 = context$1$0['catch'](0);

      case 21:
      case 'end':
        return context$1$0.stop();
    }
  }, null, _this, [[0, 19]]);
};

// name validation

// Check if email is already registered

// Create new user

// if users is present then apply pagination