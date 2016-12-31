var express = require('express');
var router = express.Router();

var services = require('../services'),
    response = require('../utils/response'),
    middlewares = require('../middlewares');

router.get('/', response(services.carousel.get));

module.exports = router;
