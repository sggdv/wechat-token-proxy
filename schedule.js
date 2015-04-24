var wx_flush_access_token = require('./wx_flush_access_token');
var shipper = require('./shipper');
var schedule = require('node-schedule');

var cron = '30 * * * *';

var job = function() {
  wx_flush_access_token.token(function(err, data) {
    shipper.ship(data, function() {
      console.log('successed at ' + new Date());
    });
  });
};

var worker = {};

worker.start = function() {
  job();
  schedule.scheduleJob(cron, job);
};

module.exports = worker;