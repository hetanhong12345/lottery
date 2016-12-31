var express = require('express');
var router = express.Router();

var	services = require('../services'),
	response = require('../utils/response'),
	middlewares = require('../middlewares');

router.post('/', response(services.users.auth));

module.exports = router;
