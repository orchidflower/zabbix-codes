var express = require('express');
var wrap = require('co-express');
var router = express.Router();
var path = require('path');
var services = require('../services')
var co = require('co');

router.delete('/ids/:id', wrap(function *(req, res, next) {
  console.log("the id is", req.params.id);
  var rows = yield services.deleteById(req.params.id);
  var ret = {success: true};
  res.json(ret);
}));

/* GET view listing. */
router.get('/', wrap(function *(req, res, next) {
  // res.send('respond with a resource');
  res.sendFile(path.join(__dirname, "../views/index.html"));
}));

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


router.get('/:code', wrap(function *(req, res, next) {
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

router.post('/:code', wrap(function *(req, res, next) {
  console.log(req.params.code);
  let record = req.body;
  var rows = yield services.updateByCode(req.params.code, record);
  var ret = {success:true};
  res.json(ret);
}));

router.post('/', wrap(function *(req, res, next) {
  console.log(req.body);
  var rows = yield services.addCode(req.body);
  var ret = {success: true};
  res.json(ret);
}));


module.exports = router;
