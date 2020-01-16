import * as Koa from 'koa';
import * as Logger from './common/logger';
import * as KoaBodyParser from 'koa-bodyparser';
import * as RouterSwagger from './swagger';
import RouterCodes from './routes/codes';
import RouterContacts from './routes/contacts';
import RouterSupport from './routes/support';
import RouterSystems from './routes/systems';
import {returnResponse} from './resp';

let logger = Logger.getLogger('main');

const handler404 = (ctx: Koa.Context)=> {
    ctx.status = 404;
    ctx.set('Content-Type', 'application/json');
    ctx.body = {success: 'false', message: 'not found'};
};

const handlerError = (ctx: Koa.Context, next: any) => {
    
}


const init_server = async () => {
    const app : Koa = new Koa();

    app.use(KoaBodyParser());
    app.use(RouterContacts.routes());
    app.use(RouterSystems.routes());
    app.use(RouterCodes.routes());
    app.use(RouterSupport.routes());
    await RouterSwagger.init(app);
    app.use(handler404);

    let listenPort = 3000;
    logger.info(`Starting server on port ${ listenPort }...`);
    await app.listen(listenPort);
    logger.info('Server started.');
}

(async() => {
    init_server();
})();