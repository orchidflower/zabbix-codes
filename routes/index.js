var express = require('express');
var path = require('path');
var services = require('../services');
var wrap = require('co-express');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

// Query
router.get('/codes/:code', wrap(function *(req, res, next) {
  var code = req.params.code;
  var rows = yield services.queryByCode(code);
  if (rows==null) {
    let ret = {success: false, message: '没有相关记录'}
    // res.json(ret);
    res.render('codes', ret);
    return;
  }

  // 
  router.get('/checking/version', function (req, res) {
	  res.sendFile(path.join(__dirname, "../views/version.html"));
  });

  
  res.render('codes', rows);
}));

module.exports = router;
