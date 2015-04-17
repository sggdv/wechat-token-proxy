var fs = require('fs');

var filename = 'wx_access_token.json';

var worker = {};

worker.ship = function(data, callback) {
  var json = { access_token: data.access_token };
  fs.writeFile(filename, JSON.stringify(json), function(err) {
    callback();
  });
};

worker.get = function(callback) {
  fs.readFile(filename, function(err, data) {
    if (!err) {
      var data_json = JSON.parse(data);
      callback(null, data_json.access_token);
    } else {
      callback(err, {});
    }
  });
};

module.exports = worker;