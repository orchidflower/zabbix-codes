import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
import * as KoaStatic from 'koa-static';
import * as KoaMount from 'koa-mount';
import * as services from '../services/services';

// const Koa = require('koa');
// const KoaRouter = require('koa-router');
// const KoaStatic = require('koa-static');

const router = new KoaRouter();

export async function init(app: Koa) {
    router.get('/codes/:code', async (ctx: Koa.ParameterizedContext, next) => {
        let code = ctx.params.code;
        let rows = await services.queryByCode(code);
        if (rows==null) {
        //   let ret = {success: false, message: '没有相关记录'}
        //   return returnResponse(ctx, ret);
            await ctx.render('404', {});
        } else {
            await ctx.render('codes', rows);
        }
    });

    // Use public as root directory
    app.use(KoaMount('/static', KoaStatic('./public/static')));
    app.use(KoaMount('/swagger', KoaStatic('./public/swagger')));
    app.use(KoaMount('/', KoaStatic('./public/dist')));
    app.use(router.routes());
}
