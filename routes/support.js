var express = require('express');
var wrap = require('co-express');
var co = require('co');
var log4js = require('log4js');
var services = require('../services');

var router = express.Router();

let logger = log4js.getLogger('routes.codes');

// Path Definition
/**
 * @swagger
 * /support/titles:
 *   get:
 *     description: Get all titles
 *     tags:
 *       - Support
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: check
 */
router.get('/titles', wrap(function *(req, res, next){
  var rows = yield services.listAllTitles();
  if (rows==null) {
    let ret = {success: false, message: '没有相关记录'};
    res.json(ret);
    return;
  }
  let ret = {success: true, data: rows};
  res.json(ret);    
}));

module.exports = router;