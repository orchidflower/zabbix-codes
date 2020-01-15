import * as KoaRouter from 'koa-router';
import {returnResponse, returnSuccess, buildSuccess} from '../resp';
import * as services from '../services';
import * as log4js from 'log4js';

const router = new KoaRouter({
    prefix: '/api/contacts'
});

let logger = log4js.getLogger('contacts');

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
router.get('/all', async (ctx, next) => {
    let rows = await services.listAllContacts();
    if (rows==null) {
        let ret = {success: false, message: '没有相关记录'};
        return returnResponse(ctx, ret);
    }
    return returnSuccess(ctx, rows);
});

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
router.get('/:contact', async (ctx, next) => {
  logger.debug(ctx.params.contact);
  let contact = ctx.params.contact;
  let rows = await services.queryByContact(contact);
  if (rows==null) {
    let ret = {success: false, message: '没有相关记录'}
    return returnResponse(ctx, ret);
  }
  return returnSuccess(ctx, rows);
});

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
router.post('/', async (ctx, next) => {
  logger.debug(ctx.request.body);
  let rows = await services.addContact(ctx.request.body);
  let ret = {success: true};
  return returnResponse(ctx, ret);
});

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
router.post('/:contact', async (ctx, next) => {
  logger.debug(ctx.params.contact);
  let record = ctx.request.body;
  let rows = await services.updateContactByContact(ctx.params.contact, record);
  let ret = {success:true};
  return returnResponse(ctx, ret);
});

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
router.delete('/ids/:id', async (ctx, next) => {
  logger.debug("the id is", ctx.params.id);
  let rows = await services.deleteContactById(ctx.params.id);
  var ret = {success: true};
  return returnResponse(ctx, ret);
});


export default router;