/**
 * http://usejsdoc.org/
 */
var express = require('express')
  , router = express.Router();
router.use('/flyers', require('./flyers'));
router.use('/device', require('./device'));
router.use('/account', require('./account'));

module.exports = router;

