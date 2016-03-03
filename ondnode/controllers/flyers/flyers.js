var express = require('express')
  , router = express.Router()
  , flyers = require(__base + './models/flyers');

//Image upload related modules.
var multer  = require('multer');
var upload = multer({ dest: 'uploads/'});

router.get('/', function(req, res) {
	flyers.get(req, res);
});

router.post('/', function(req, res) {
	flyers.create(req, res);
});

router.post('/upload', upload.single('file'), function(req, res) {
	flyers.upload(req, res);
});

module.exports = router;