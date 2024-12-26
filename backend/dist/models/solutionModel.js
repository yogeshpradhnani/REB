'use strict';

var _require = require('mongoose');

var Schema = _require.Schema;
var mongoose = _require.mongoose;

var solutionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    longDescription: {
        type: String

    },

    shortImage: {
        type: String,
        required: true
    },
    longImage: {
        type: String,
        required: true

    }

}, {
    timestamps: true

});

module.exports = mongoose.model('Solution', solutionSchema);