var express = require('express');
var wrap = require('co-express');
var services = require('../services');
var log4js = require('log4js');

var router = express.Router();

let logger = log4js.getLogger('routes.systems');

router.get('/all', wrap(function *(req, res, next) {
  var rows = yield services.listAllCodes();
  if (rows==null) {
    let ret = {success: false, message: '没有相关记录'};
    res.json(ret);
    return;
  }
  let ret = {success: true, data: rows};
  res.json(ret);
}));

module.exports = router;