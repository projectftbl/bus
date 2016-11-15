var redis = require('@recipher/redis')
  , Redis = require('ioredis')

var Connection = function() {
  this.redis = new Redis(redis.config);

  this.subscribe = function() {
    this.redis.subscribe.apply(this.redis, arguments);
  };

  this.on = function() {
    this.redis.on.apply(this.redis, arguments);
  };
};

module.exports = Connection;
