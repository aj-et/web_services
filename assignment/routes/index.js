const express = require('express');
const router = express.Router();

router.use('/contacts', require('./contacts'))
router.use('/', require('./name'))

module.exports = router;