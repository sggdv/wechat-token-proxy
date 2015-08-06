var express = require('express');
var path = require('path');
var morgan = require('morgan');
var shipper = require('./shipper');
var schedule = require('./schedule');
var access = require('./conf/access');

var app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// 安全机制
app.use(function(req, res, next) {
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
    next();
  } else {
    res.send("permission deny !");
  }
});

app.get('/', function(req, res) {
  shipper.get(function(err, data) {
    res.json({ access_token: data });
  });
});

app.get('/ticket', function(req, res) {
  shipper.ticket(function(err, data) {
    res.json({ ticket: data});
  });
});

schedule.start();

var server = app.listen(3000, function() {
  console.log('listen on port %d', server.address().port);
});
