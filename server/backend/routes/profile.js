const express = require('express');
const router = express.Router();
const { profile } = require('../controllers/profile');
router.post('/create', profile);
module.exports = router;