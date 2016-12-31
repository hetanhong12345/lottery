var util = require('util');

function NBLError(errno, message) {
    NBLError.super_.call(this);
    Error.captureStackTrace(this, this.constructor)
    this.errno = errno || 99999;
    this.message = (message || 'NBL Error') + '(' + errno + ')';
}

util.inherits(NBLError, Error);

NBLError.prototype.name = 'NBLError';

module.exports = NBLError;