const express = require('express');
const { authenticateJwt } = require('../middlewares/authentication');
const profileController = require('../controllers/profileController');

const router = express.Router();

router.get('/:username', authenticateJwt, profileController.getProfile);


module.exports = router;