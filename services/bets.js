var Promise         = require('bluebird'),
    util            = require('util'),
    dataProvider    = require('../models'),
    errors          = require('../errors'),
    _               = require('lodash'),
    pipeline        = require('../utils/pipeline'),
    defs            = require('../common/defs'),
    logger          = require('../common/logger'),
    NBLError        = require('../common/error'),
    jwt             = require('jsonwebtoken'),
    bets;

bets = {

    fetchByUser : function(req) {
        // 检查参数
        req.checkQuery('userId', 'userId must be int').notEmpty().isInt({min : 0});
        var error = req.validationErrors();
        if (error) {
            throw new NBLError(defs.ERRNO.INVALID_PARAMS, util.inspect(error));
        }

        req.sanitizeQuery('userId').toInt();

        if (req.query.userId == 0) {
            req.query.userId = req.decoded.id;
        }

        return [
            {
                type : 1,
                issue : '20160005',
                date : new Date(),
                amount : 20,
                isCopy : false,
                status : 1
            },
            {
                type : 1,
                issue : '20160005',
                date : new Date(),
                amount : 20,
                isCopy : true,
                status : 2
            }
        ];
    }
};

module.exports = bets;
