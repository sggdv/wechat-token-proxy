// 数据的IO操作

var fs = require('fs');

var access_token_filename = 'destinations/wx_access_token.json';
var ticket_filename = 'destinations/wx_ticket.json';

var worker = {};

// write access_token to file
worker.ship = function (data, callback) {
  var json = { access_token: data.access_token };
  fs.writeFile(access_token_filename, JSON.stringify(json), function (err) {
    callback(err);
  });
};

//从文件中获取 access_token
worker.get = function (callback) {
  fs.readFile(access_token_filename, function (err, data) {
    if (!err) {
      var data_json = JSON.parse(data);
      callback(null, data_json.access_token);
    } else {
      callback(err, {});
    }
  });
};

// write ticket to file
worker.shipTicket = function (data, callback) {
  var json = { ticket: data.ticket };
  fs.writeFile(ticket_filename, JSON.stringify(json), function (err) {
    callback(err);
  });
}

// 从文件中获取 ticket 
worker.ticket = function(callback) {
  fs.readFile(ticket_filename, function (err, data) {
    if (err) {
      callback(err, {}); 
      return; 
    }

    var data_json = JSON.parse(data);
    callback(null, data_json.ticket);
  });
}

module.exports = worker;