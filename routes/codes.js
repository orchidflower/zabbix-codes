var express = require('express');
var router = express.Router();
var path = require('path');
var services = require('../services')
var co = require('co');

/* GET users listing. */
router.get('/', function (req, res, next) {
  // res.send('respond with a resource');
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

router.get('/all', (req, res, next) => co(function* () {
  var rows = yield services.listAllCodes();
  if (rows==null) {
    let ret = {success: false, message: '没有相关记录'};
    res.json(ret);
    return;
  }
  let ret = {success: true, data: rows};
  res.json(ret);
}));

router.get('/:code', (req, res, next) => co(function *() {
  console.log(req.params.code);
  var code = req.params.code;
  var rows = yield services.queryByCode(code);
  if (rows==null) {
    let ret = {success: false, message: '没有相关记录'}
    res.json(ret);    
    return;
  }
  var ret = {success: true, data: rows};
  res.json(ret);
}));

module.exports = router;
