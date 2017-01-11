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
 *   ZabbixContact:
 *     type: object
 *     required:
 *       - contact
 *       - name
 *       - title
 *       - qq
 *       - weixin
 *       - mobile
 *     properties:
 *       contact:
 *         type: string
 *       name:
 *         type: string
 *       title:
 *         type: string
 *       qq:
 *         type: string
 *       weixin:
 *         type: string
 *       mobile:
 *         type: string
*/

// Path Definition
/**
 * @swagger
 * /contacts/all:
 *   get:
 *     description: Get all available contacts
 *     tags:
 *       - Contacts
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: check
 */
router.get('/all', wrap(function *(req, res, next) {
  var rows = yield services.listAllContacts();
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
 * /contacts/{contact}:
 *   get:
 *     description: Get one specific contact information
 *     tags:
 *       - Contacts
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: contact
 *         description: one contact
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: check
 */
router.get('/:contact', wrap(function *(req, res, next) {
  logger.debug(req.params.contact);
  var contact = req.params.contact;
  var rows = yield services.queryByContact(contact);
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
 * /contacts:
 *   post:
 *     description: Add one contact
 *     tags:
 *       - Contacts
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: one contact
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/ZabbixContact'
 *     responses:
 *       200:
 *         description: check
 */
router.post('/', wrap(function *(req, res, next) {
  logger.debug(req.body);
  var rows = yield services.addContact(req.body);
  var ret = {success: true};
  res.json(ret);
}));

/**
 * @swagger
 * /contacts/{contact}:
 *   post:
 *     description: Update one zabbix contact
 *     tags:
 *       - Contacts
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: contact
 *         description: one contact
 *         in: path
 *         required: true
 *         type: string
 *       - name: body
 *         description: one contact
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/ZabbixContact'
 *     responses:
 *       200:
 *         description: check
 */
router.post('/:contact', wrap(function *(req, res, next) {
  logger.debug(req.params.contact);
  let record = req.body;
  var rows = yield services.updateContactByCode(req.params.contact, record);
  var ret = {success:true};
  res.json(ret);
}));

/**
 * @swagger
 * /contacts/ids/{id}:
 *   delete:
 *     description: Delete one specific contact
 *     tags:
 *       - Contacts
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
  var rows = yield services.deleteContactById(req.params.id);
  var ret = {success: true};
  res.json(ret);
}));


module.exports = router;