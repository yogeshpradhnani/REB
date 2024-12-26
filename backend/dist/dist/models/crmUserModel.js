'use strict';

var _require = require('mongoose');

var Schema = _require.Schema;
var mongoose = _require.mongoose;

var userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true

    },
    description: {
        type: String

    }
}, {
    timestamps: true

});

module.exports = mongoose.model('User', userSchema);