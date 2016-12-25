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

// router.get('/all', function(req, res, next) {
//   var rows = services.listAllCodes();
//   res.json(rows);
// });
router.get('/all', (req, res, next) => co(function* () {
  var rows = yield services.listAllCodes();
  res.json(rows);
}).catch(err => {
  log.info(err);
  res.send({ error: err });
}
  )
);

router.get('/:code', (req, res, next) => co(function *() {
  console.log(req.params.code);
  var code = req.params.code;
  var rows = yield services.queryByCode(code);
  if (rows==null) {
    res.json({
      success: false,
      message: '没有找到对应的代码'
    });    
    return;
  }
  var ret = {
    success: true,
    data: rows
  }
  res.json(ret);
})
);


module.exports = router;
