var fs = require('fs');

var access_token_filename = 'destinations/wx_access_token.json';
var ticket_filename = 'destinations/wx_ticket.json';

var worker = {};

worker.ship = function(data, callback) {
  var json = { 
    access_token: data.access_token 
  };
  fs.writeFile(access_token_filename, JSON.stringify(json), function(err) {
    callback();
  });
};

worker.get = function(callback) {
  fs.readFile(access_token_filename, function(err, data) {
    if (!err) {
      var data_json = JSON.parse(data);
      callback(null, data_json.access_token);
    } else {
      callback(err, {});
    }
  });
};

worker.shipTicket = function(data, callback) {
  var json = { 
    ticket: data.ticket 
  };
  fs.writeFile(ticket_filename, JSON.stringify(json), function(err) {
    callback();
  });
}

worker.ticket = function(callback) {
  fs.readFile(ticket_filename, function(err, data) {
    if (!err) {
      var data_json = JSON.parse(data);
      callback(null, data_json.ticket);
    } else {
      callback(err, {});
    }
  });
}

module.exports = worker;