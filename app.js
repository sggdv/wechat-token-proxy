var express = require('express');
var path = require('path');
var morgan = require('morgan');
var shipper = require('./shipper');
var schedule = require('./schedule');

var app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  shipper.get(function(err, data) {
    res.json({ access_token: data });
  });
});

schedule.start();

app.listen(3000);