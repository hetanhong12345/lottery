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
    bulletins;

bulletins = {
    get : function(req) {
        var data = [
            {
                html: '公告：恭喜张国瑞获得5000万大奖',
            },
            {
                html: '公告：恭喜王文明六角碎片游戏全部通关',
            }
        ];
        return Promise.resolve(data);
    }
};

module.exports = bulletins;
