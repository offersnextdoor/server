/**
 * http://usejsdoc.org/
 */
var express = require('express')
, router = express.Router();
router.use('/', require('./account'));
router.use('/branches', require('./account'));

module.exports = router;