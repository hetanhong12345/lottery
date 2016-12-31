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
    users;

users = {

    reg : function(req) {
        // 检查参数
        req.checkBody('type', 'type must be 1 - N').isInt({
            min : defs.AUTH_TYPE.MOBILE,
            max : defs.AUTH_TYPE.ALIPAY
        });
        req.checkBody('open_id', 'open_id must exist').notEmpty();
        req.checkBody('credential', 'credential must exist').notEmpty();

        var error = req.validationErrors();
        if (error) {
            throw new NBLError(defs.ERRNO.INVALID_PARAMS, util.inspect(error));
        }

        req.sanitizeBody('type').toInt();
        logger.debug('users.reg, req:', req.body);

        return dataProvider.Auth.forge({
            type : req.body.type,
            open_id : req.body.open_id,
            credential : req.body.credential
        }).save().then(function(auth) {
            var user = {};
            if (req.body.type == defs.AUTH_TYPE.MOBILE) {
                user.mobile = req.body.open_id
            }
            return dataProvider.User.forge(user).save().then(function(user) {
                return [auth, user];
            });
        }).then(function(authUser) {
            logger.debug('auth, user', authUser[0].id, authUser[1].id);
            var auth = authUser[0];
            var user = authUser[1];

            return auth.save({'user_id' : user.id}).then(function() {
                var token = jwt.sign({
                        id : user.id
                    }, defs.AUTH_TOKEN, {
                        expiresIn : '24h' // expires in 24 hours
                    }
                );

                return token;
            })
        }).then(function(token){
            return {
                accessToken : token
            };
        });
    },

    auth : function(req) {
        // 检查参数
        req.checkBody('type', 'type must be 1 - N').isInt({
            min : defs.AUTH_TYPE.MOBILE,
            max : defs.AUTH_TYPE.ALIPAY
        });
        req.checkBody('open_id', 'open_id must exist').notEmpty();
        req.checkBody('credential', 'credential must exist').notEmpty();

        var error = req.validationErrors();
        if (error) {
            throw new NBLError(defs.ERRNO.INVALID_PARAMS, util.inspect(error));
        }

        req.sanitizeBody('type').toInt();

        return dataProvider.Auth.forge({
            type : req.body.type,
            open_id : req.body.open_id
        }).fetch({withRelated: ['user']}).then(function(authUser) {
            if (!authUser || authUser.get('credential') != req.body.credential) {
                throw new NBLError(defs.ERRNO.AUTH_FAILED, 'auth failed.');
            } else {
                var token = jwt.sign({
                        id : authUser.related('user').id
                    }, defs.AUTH_TOKEN, {
                        expiresIn : '24h' // expires in 24 hours
                    }
                );

                return {
                    accessToken : token
                };
            }
        });
    },

    info : function(req) {
        logger.debug('user.info, decoded:', req.decoded);
        req.checkParams('id', 'invalid user id.').isInt();

        var error = req.validationErrors();
        if (error) {
            throw new NBLError(defs.ERRNO.INVALID_PARAMS, util.inspect(error));
        }

        req.sanitizeParams('id').toInt();
/*
        return dataProvider.User.forge({
            id : req.params.id == 0 ? req.decoded.id : req.params.id,
        }).fetch().then(function(user) {
            return user.toJSON();
        });
*/
        return {
            base : {
                nick : '荣耀',
                head : '',
                following : 100,
                fans : 300,
                newMessages : 2,
                newAchievements : 1
            },
            account : {
                available : 1500,
                hongbao : 80,
                points : 6000
            },
            stats : {
                hitRatio : 70,
                hitBeats : 80,
                hitTimes : 165,
                totalWinning : 3000,
                profitRatio : 10,
                onLeaderBoardTimes : 3,
                lotteryCopied : 5,
                lotteryCopies : 15
            }
        };
    }
};

module.exports = users;
