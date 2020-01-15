"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const KoaRouter = require("koa-router");
const resp_1 = require("../resp");
const services = require("../services");
const log4js = require("log4js");
const router = new KoaRouter({
    prefix: '/api/systems'
});
let logger = log4js.getLogger('systems');
// Model definition
/**
 * @swagger
 * definitions:
 *   ZabbixSystem:
 *     type: object
 *     required:
 *       - system
 *       - name
 *       - contact
 *       - description
 *     properties:
 *       system:
 *         type: string
 *       name:
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
router.get('/all', async (ctx, next) => {
    let rows = await services.listAllSystems();
    if (rows == null) {
        let ret = { success: false, message: '没有相关记录' };
        return resp_1.returnResponse(ctx, ret);
    }
    let ret = { success: true, data: rows };
    return resp_1.returnResponse(ctx, ret);
});
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
router.get('/:system', async (ctx, next) => {
    logger.debug(ctx.params.system);
    let system = ctx.params.system;
    let rows = await services.queryBySystem(system);
    if (rows == null) {
        let ret = { success: false, message: '没有相关记录' };
        return resp_1.returnResponse(ctx, ret);
    }
    var ret = { success: true, data: rows };
    return resp_1.returnResponse(ctx, ret);
});
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
router.post('/', async (ctx, next) => {
    logger.debug(ctx.request.body);
    let rows = await services.addSystem(ctx.request.body);
    var ret = { success: true };
    return resp_1.returnResponse(ctx, ret);
});
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
router.post('/:system', async (ctx, next) => {
    logger.debug(ctx.params.system);
    let record = ctx.request.body;
    let rows = await services.updateBySystem(ctx.params.system, record);
    var ret = { success: true };
    return resp_1.returnResponse(ctx, ret);
});
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
router.delete('/ids/:id', async (ctx, next) => {
    logger.debug("the id is", ctx.params.id);
    let rows = await services.deleteSystemById(ctx.params.id);
    let ret = { success: true };
    return resp_1.returnResponse(ctx, ret);
});
exports.default = router;
