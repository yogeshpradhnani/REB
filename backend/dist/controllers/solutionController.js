"use strict";

var _this = this;

var solutionSchema = require("../models/solutionModel.js");

exports.getSolutions = function callee$0$0(req, res) {
    var solutions;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.prev = 0;
                context$1$0.next = 3;
                return regeneratorRuntime.awrap(solutionSchema.find({}));

            case 3:
                solutions = context$1$0.sent;

                res.status(200).json({ success: true, message: "Data fetched successfully", data: solutions });
                context$1$0.next = 11;
                break;

            case 7:
                context$1$0.prev = 7;
                context$1$0.t0 = context$1$0["catch"](0);

                console.error(context$1$0.t0);
                res.status(500).json({ message: 'Error fetching solutions', success: false });

            case 11:
            case "end":
                return context$1$0.stop();
        }
    }, null, _this, [[0, 7]]);
};
exports.postSolution = function callee$0$0(req, res, next) {
    var _req$body, title, longDescription, shortDescription, shortImage, longImage, newSolution, createdSolution;

    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.prev = 0;

                console.log("Creating a new solution...");
                _req$body = req.body;
                title = _req$body.title;
                longDescription = _req$body.longDescription;
                shortDescription = _req$body.shortDescription;
                shortImage = _req$body.shortImage;
                longImage = _req$body.longImage;
                newSolution = new solutionSchema({
                    title: title,
                    longDescription: longDescription,
                    shortDescription: shortDescription

                });

                console.log(req.files.shortImage[0]);

                if (req.files) {
                    if (req.files.shortImage && req.files.shortImage.length > 0) {
                        shortImage = req.files.shortImage[0].originalname;
                    }
                    if (req.files.longImage && req.files.longImage.length > 0) {
                        longImage = req.files.longImage[0].originalname;
                    }
                }

                newSolution.shortImage = shortImage;
                newSolution.longImage = longImage;
                context$1$0.next = 15;
                return regeneratorRuntime.awrap(newSolution.save());

            case 15:
                createdSolution = context$1$0.sent;

                if (createdSolution) {
                    res.status(201).json({
                        success: true,
                        message: 'Solution created successfully',
                        data: createdSolution
                    });
                } else {
                    res.status(400).json({
                        success: false,
                        message: 'Failed to create solution'
                    });
                }
                context$1$0.next = 23;
                break;

            case 19:
                context$1$0.prev = 19;
                context$1$0.t0 = context$1$0["catch"](0);

                console.error("Error creating solution:", context$1$0.t0.message || context$1$0.t0);

                next(context$1$0.t0);

            case 23:
            case "end":
                return context$1$0.stop();
        }
    }, null, _this, [[0, 19]]);
};

// TODO: Implement your logic here to fetch solutions from the database