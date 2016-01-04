var redis = require('@ftbl/redis');

module.exports = function(name, data, options) {
  redis.connection.publish('bus:' + name, JSON.stringify({ data: data, options: options }));
};
