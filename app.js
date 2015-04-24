var express = require('express');
var path = require('path');
var morgan = require('morgan');
var shipper = require('./shipper');
var schedule = require('./schedule');
var access = require('./access');

var app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  var hostname = access.hostname;

  var valid = false;
  if (hostname) {
    for (var i = 0; i < hostname.length; i++) {
      if (hostname[i] == req.hostname) {
        valid = true;
        break;
      }
    };
  }

  if(!valid) {
    var ip = access.ip;
    if (ip) {
      for (var i = 0; i < ip.length; i++) {
        if(ip[i] == req.ip) {
          valid = true;
          break;
        }
      };
    }
  }

  if (valid) {
    shipper.get(function(err, data) {
      res.json({ access_token: data });
    });
  } else {
    res.send("Sorry, You don't have permission !");
  }

});

schedule.start();

var server = app.listen(3000, function() {
  console.log('listen on port %d', server.address().port);
});