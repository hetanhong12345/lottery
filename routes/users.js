var express = require('express');
var router = express.Router();

var	services = require('../services'),
    response = require('../utils/response'),
	middlewares = require('../middlewares');

router.post('/', response(services.users.reg));
router.get('/:id/', middlewares.auth.check , response(services.users.info));

module.exports = router;
