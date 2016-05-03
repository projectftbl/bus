var util = require('util')
  , events = require('events');

var Listener = function() {
  if (this instanceof Listener === false) return new Listener;

  events.EventEmitter.call(this);
};

util.inherits(Listener, events.EventEmitter);

Listener.prototype.listen = function(name) {
  var Connection = require('./connection')
    , connection = new Connection; // On demand

  connection.subscribe('bus:' + name);

  connection.on('message', function(channel, message) {
    if (channel.substring(channel.indexOf(':')+1) !== name) return;

    var data = JSON.parse(message);

    this.emit('data', data.data, data.options);
  }.bind(this));
};

module.exports = Listener;