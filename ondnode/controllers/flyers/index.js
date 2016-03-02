/**
 * http://usejsdoc.org/
 */
var express = require('express')
, router = express.Router();
router.use('/', require('./flyers'));
module.exports = router;