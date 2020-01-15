"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const KoaRouter = require("koa-router");
const resp_1 = require("../resp");
const services = require("../services");
const log4js = require("log4js");
const router = new KoaRouter({
    prefix: '/api/support'
});
let logger = log4js.getLogger('support');
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
router.get('/titles', async (ctx, next) => {
    let rows = await services.listAllTitles();
    if (rows == null) {
        let ret = { success: false, message: '没有相关记录' };
        return resp_1.returnResponse(ctx, ret);
    }
    let ret = { success: true, data: rows };
    return resp_1.returnResponse(ctx, ret);
});
/**
 * @swagger
 * /support/levels:
 *   get:
 *     description: Get all levels
 *     tags:
 *       - Support
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: check
 */
router.get('/levels', async (ctx, next) => {
    let rows = await services.listAllLevels();
    if (rows == null) {
        let ret = { success: false, message: '没有相关记录' };
        return resp_1.returnResponse(ctx, ret);
    }
    let ret = { success: true, data: rows };
    return resp_1.returnResponse(ctx, ret);
});
exports.default = router;
