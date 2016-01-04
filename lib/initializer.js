var fs = require('fs')
  , path = require('path')
  , Queue = require('./listener');

module.exports = function(lib, folders) {
  folders.forEach(function(folder) {

    var directory = path.join(lib, folder, 'listeners');

    if (fs.existsSync(directory) === false) return;

    var files = fs.readdirSync(directory);

    files.forEach(function(file) {
      var Listener = require(path.join(directory, file));
      new Listener(new Queue).listen();
    });
  });
};