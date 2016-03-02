var express = require('express')
  , router = express.Router()
  , account = require(__base + './models/account');

router.post('/', function(req, res) {
	account.create(req, res);
});

router.post('/branches', function(req, res) {
	account.createBranch(req, res);
});

module.exports = router;