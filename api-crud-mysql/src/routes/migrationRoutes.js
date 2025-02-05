const express = require('express');
const router = express.Router();
const { migrateData } = require('../controllers/migrationController');

router.get('/migrate', migrateData);

module.exports = router;

