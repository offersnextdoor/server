/**
 * http://usejsdoc.org/
 */
var express = require('express')
, router = express.Router();
router.use('/', require('./device'));
router.use('/regions', require('./device'));
module.exports = router;