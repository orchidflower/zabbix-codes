import * as KoaRouter from 'koa-router';
import {returnResponse, returnSuccess, buildSuccess} from '../utils/resp';
import * as services from '../services/services';
import * as log4js from 'log4js';

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
  if (rows==null) {
    let ret = {success: false, message: '没有相关记录'};
    return returnResponse(ctx, ret);
  }
  let ret = {success: true, data: rows};
  return returnResponse(ctx, ret);
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
  if (rows==null) {
    let ret = {success: false, message: '没有相关记录'};
    return returnResponse(ctx, ret);
  }
  let ret = {success: true, data: rows};
  return returnResponse(ctx, ret);
});

export default router;