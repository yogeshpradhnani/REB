
const express = require('express');
const router = express.Router();
const crmController = require('../controllers/crmController.js');
const { getSolutions, postSolution } = require('../controllers/solutionController.js');
const upload = require('../middleware/multer.js');

// router.get('/data', teamController.);
router.post('/register',crmController.registerForm );
router.get('/get',crmController.getAllUser );
router.get('/getSolution',getSolutions );
// Route for posting solution with file uploads
router.post('/solution', upload, postSolution);


module.exports = router;
