var request = require('request');
var worker = {};

worker.ticket = function(access_token, callback) {
  var url = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=';
  url += access_token;
  url += '&type=wx_card';
  request(url, function(err, res, body) {
    if (!err && res.statusCode == 200) {
      var info = JSON.parse(body);
      callback(null, info);
    } else {
      console.log(err);
      callback(err, {});
    }
  });
};

module.exports = worker;