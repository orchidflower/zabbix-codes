var express = require('express');
var wrap = require('co-express');
var services = require('../services');
var log4js = require('log4js');

var router = express.Router();

let logger = log4js.getLogger('routes.systems');

// Model definition
/**
 * @swagger
 * definitions:
 *   ZabbixSystem:
 *     type: object
 *     required:
 *       - system
 *       - contact
 *       - description
 *     properties:
 *       system:
 *         type: string
 *       contact:
 *         type: string
 *       description:
 *         type: string
*/

// Path Definition
/**
 * @swagger
 * /systems/all:
 *   get:
 *     description: Get all available systems
 *     tags:
 *       - Systems
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: check
 */
router.get('/all', wrap(function *(req, res, next) {
  var rows = yield services.listAllSystems();
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
 * /systems/{system}:
 *   get:
 *     description: Get one specific system information
 *     tags:
 *       - Systems
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: system
 *         description: one system
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: check
 */
router.get('/:system', wrap(function *(req, res, next) {
  logger.debug(req.params.system);
  var system = req.params.system;
  var rows = yield services.queryBySystem(system);
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
 * /systems:
 *   post:
 *     description: Add one system
 *     tags:
 *       - Systems
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: one system
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/ZabbixSystem'
 *     responses:
 *       200:
 *         description: check
 */
router.post('/', wrap(function *(req, res, next) {
  logger.debug(req.body);
  var rows = yield services.addSystem(req.body);
  var ret = {success: true};
  res.json(ret);
}));

/**
 * @swagger
 * /systems/{system}:
 *   post:
 *     description: Update one zabbix system
 *     tags:
 *       - Systems
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: system
 *         description: one system
 *         in: path
 *         required: true
 *         type: string
 *       - name: body
 *         description: one system
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/ZabbixSystem'
 *     responses:
 *       200:
 *         description: check
 */
router.post('/:system', wrap(function *(req, res, next) {
  logger.debug(req.params.system);
  let record = req.body;
  var rows = yield services.updateBySystem(req.params.system, record);
  var ret = {success:true};
  res.json(ret);
}));

/**
 * @swagger
 * /systems/ids/{id}:
 *   delete:
 *     description: Delete one specific system
 *     tags:
 *       - Systems
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: the id of one system
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: check
 */
router.delete('/ids/:id', wrap(function *(req, res, next) {
  logger.debug("the id is", req.params.id);
  var rows = yield services.deleteSystemById(req.params.id);
  var ret = {success: true};
  res.json(ret);
}));

module.exports = router;