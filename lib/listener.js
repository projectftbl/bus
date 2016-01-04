var redis = require('@ftbl/redis')
  , Redis = require('ioredis')
  , util = require('util')
  , events = require('events');

var Listener = function() {
  if (this instanceof Listener === false) return new Listener;

  events.EventEmitter.call(this);
};

util.inherits(Listener, events.EventEmitter);

Listener.prototype.listen = function(name) {
  var that = this
    , conn = new Redis(redis.config);

  conn.subscribe('bus:' + name);

  conn.on('message', function(channel, message) {
    if (channel.split(':')[1] !== name) return;

    var data = JSON.parse(message);

    that.emit('data', data.data, data.options);
  });
};

module.exports = Listener;