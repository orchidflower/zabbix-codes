import * as Koa from 'koa';
import * as Logger from './common/logger';
import * as KoaBodyParser from 'koa-bodyparser';
import * as RouterSwagger from './swagger';
import * as KoaViews from 'koa-views';
import * as path from 'path';
import RouterCodes from './routes/codes';
import RouterContacts from './routes/contacts';
import RouterSupport from './routes/support';
import RouterSystems from './routes/systems';

let logger = Logger.getLogger('main');

const handlerException = async (ctx: Koa.Context, next: any) => {
    try {
        await next();
        const status = ctx.status || 404;
        if (status === 404) {
            ctx.throw(404);
        }
    } catch (err) {
        logger.error(err);
        ctx.status = err.status || 500
        if (ctx.status === 404) {
            await ctx.render('404', {error: err})
        } else {
            await ctx.render('error', {error: err});
        }

    }
}


const init_server = async () => {
    const app : Koa = new Koa();

    // app.use(handler404);
    app.use(handlerException);
    app.use(KoaViews(path.join(__dirname, '../views'), {
        extension: 'mustache'
    }));
    app.use(KoaBodyParser());
    app.use(RouterContacts.routes());
    app.use(RouterSystems.routes());
    app.use(RouterCodes.routes());
    app.use(RouterSupport.routes());
    await RouterSwagger.init(app);

    let listenPort = 3000;
    logger.info(`Starting server on port ${ listenPort }...`);
    await app.listen(listenPort);
    logger.info('Server started.');

    app.on('error', (err, ctx) => {
        logger.error('server error', err, ctx)
    })
}

(async() => {
    init_server();
})();