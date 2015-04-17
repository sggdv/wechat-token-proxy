var express = require('express');
var path = require('path');
var morgan = require('morgan');
var wx = require('./wx_config');

var app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.json({
    app_id: wx.app_id,
    access_token: 'demo'
  });
});

app.listen(3000);