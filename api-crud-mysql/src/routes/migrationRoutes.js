const express = require('express');
const router = express.Router();
const { migrateUsers } = require('../controllers/migrationController');

router.get('/migrate', migrateUsers);

module.exports = router;
