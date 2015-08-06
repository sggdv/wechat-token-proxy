// 定时任务
// 每 30 分钟刷新 access_token 和 ticket

var wx_flush_access_token = require('./refresher/wx_flush_access_token');
var wx_flush_ticket = require('./refresher/wx_flush_ticket');
var shipper = require('./shipper');
var schedule = require('node-schedule');

var cron = '30 * * * *';

// 先刷新 access_token , 再刷新 ticket
var job = function() {
  wx_flush_access_token.token(function (err, data) {
    shipper.ship(data, function () {
      wx_flush_ticket.ticket(data.access_token, function (err, ticket_data) {
        shipper.shipTicket(ticket_data, function() {});
      });
    });
  });
};

var worker = {};

worker.start = function() {
  job();
  schedule.scheduleJob(cron, job);
};

module.exports = worker;