var express = require('express');
var wrap = require('co-express');
var path = require('path');
var services = require('../services');
var co = require('co');
var log4js = require('log4js');

var router = express.Router();

let logger = log4js.getLogger('routes.codes');

// Model definition
/**
 * @swagger
 * definitions:
 *   ZabbixCode:
 *     type: object
 *     required:
 *       - code
 *       - system
 *       - title
 *       - level
 *       - description
 *       - solution
 *       - contact
 *     properties:
 *       code:
 *         type: string
 *       system:
 *         type: string
 *       title:
 *         type: string
 *       level:
 *         type: string
 *       description:
 *         type: string
 *       solution:
 *         type: string
 *       contact:
 *         type: string
*/


// Path Definition
/**
 * @swagger
 * /codes/all:
 *   get:
 *     description: Get all available codes
 *     tags:
 *       - Codes
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: check
 */
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

/**
 * @swagger
 * /codes/{code}:
 *   get:
 *     description: Get one specific code information
 *     tags:
 *       - Codes
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: code
 *         description: one code
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: check
 */
router.get('/:code', wrap(function *(req, res, next) {
  logger.debug(req.params.code);
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

/**
 * @swagger
 * /codes:
 *   post:
 *     description: Add one code
 *     tags:
 *       - Codes
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: one code
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/ZabbixCode'
 *     responses:
 *       200:
 *         description: check
 */
router.post('/', wrap(function *(req, res, next) {
  logger.debug(req.body);
  var rows = yield services.addCode(req.body);
  var ret = {success: true};
  res.json(ret);
}));

/**
 * @swagger
 * /codes/{code}:
 *   post:
 *     description: Update one zabbix code
 *     tags:
 *       - Codes
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: code
 *         description: one code
 *         in: path
 *         required: true
 *         type: string
 *       - name: body
 *         description: one code
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/ZabbixCode'
 *     responses:
 *       200:
 *         description: check
 */
router.post('/:code', wrap(function *(req, res, next) {
  logger.debug(req.params.code);
  let record = req.body;
  var rows = yield services.updateByCode(req.params.code, record);
  var ret = {success:true};
  res.json(ret);
}));

/**
 * @swagger
 * /codes/ids/{id}:
 *   delete:
 *     description: Delete one specific code
 *     tags:
 *       - Codes
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: the id of one code
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: check
 */
router.delete('/ids/:id', wrap(function *(req, res, next) {
  logger.debug("the id is", req.params.id);
  var rows = yield services.deleteById(req.params.id);
  var ret = {success: true};
  res.json(ret);
}));

module.exports = router;
