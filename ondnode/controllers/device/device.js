var express = require('express')
  , router = express.Router()
  , device = require(__base + './models/device');

router.post('/', function(req, res) {
	device.register(req, res);
});

router.post('/regions', function(req, res) {
	device.addRegions(req, res);
});

module.exports = router;