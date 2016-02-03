module.exports = function(name, data, options) {
  var redis = require('@ftbl/redis'); // On demand
  redis.connection.publish('bus:' + name, JSON.stringify({ data: data, options: options }));
};
