var request = require('request');
var wx_config = require('./wx_config');

var url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential';
url += '&appid=' + wx_config.app_id;
url += '&secret=' + wx_config.app_secret;

var worker = {};

worker.token = function(callback) {
  request(url, function(err, res, body) {
    if (!err && res.statusCode == 200) {
      var info = JSON.parse(body);
      callback(null, info);
    } else {
      callback(err, {});
    }
  });
};

module.exports = worker;