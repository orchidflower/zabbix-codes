"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const KoaRouter = require("koa-router");
const resp_1 = require("../resp");
var services = require('../services');
var log4js = require('log4js');
const router = new KoaRouter({
    prefix: '/api/codes'
});
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
router.get('/all', async (ctx, next) => {
    var rows = await services.listAllCodes();
    if (rows == null) {
        let ret = { success: false, message: '没有相关记录' };
        resp_1.returnResponse(ctx, ret);
        return;
    }
    return resp_1.returnSuccess(ctx, rows);
});
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
router.get('/:code', async (ctx, next) => {
    let code = ctx.params.code;
    logger.debug(code);
    let rows = await services.queryByCode(code);
    if (rows == null) {
        let ret = { success: false, message: '没有相关记录' };
        return resp_1.returnResponse(ctx, ret);
    }
    return resp_1.returnSuccess(ctx, rows);
});
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
router.post('/', async (ctx, next) => {
    logger.debug(ctx.body);
    let rows = await services.addCode(ctx.body);
    return resp_1.returnResponse(ctx, resp_1.buildSuccess(null));
});
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
router.post('/:code', async (ctx, next) => {
    logger.debug(ctx.params.code);
    let record = ctx.body;
    let rows = await services.updateByCode(ctx.params.code, record);
    return resp_1.returnResponse(ctx, resp_1.buildSuccess(null));
});
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
router.delete('/ids/:id', async (ctx, next) => {
    logger.debug("the id is", ctx.params.id);
    let rows = await services.deleteById(ctx.params.id);
    return resp_1.returnResponse(ctx, resp_1.buildSuccess(null));
});
exports.default = router;
