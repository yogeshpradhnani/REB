'use strict';

var multer = require('multer');
var path = require('path');

// Set up multer storage with the original file name
var storage = multer.diskStorage({
    destination: function destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function filename(req, file, cb) {
        cb(null, file.originalname); // Use the original file name
    }
});

var upload = multer({
    storage: storage,
    limits: {
        fileSize: 5000000 },
    // 5MB file size limit
    fileFilter: function fileFilter(req, file, cb) {
        // Allow only .jpg, .jpeg, .png files
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Only .jpg, .jpeg, .png files are allowed!'), false);
        }
        cb(null, true);
    }
}).fields([{ name: 'shortImage', maxCount: 1 }, { name: 'longImage', maxCount: 1 }]);

module.exports = function (req, res, next) {
    upload(req, res, function (err) {
        if (err) {
            return res.status(400).json({ success: false, message: err.message });
        }

        // Store files with their original names
        if (req.files) {
            req.body.shortImage = req.files.shortImage[0].originalname;
            req.body.longImage = req.files.longImage[0].originalname;
        }

        next();
    });
};