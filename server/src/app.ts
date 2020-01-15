import * as Koa from 'koa';
import * as KoaBodyParser from 'koa-bodyparser';
import * as RouterSwagger from './swagger';
import RouterCodes from './routes/codes';
import * as log4js from 'log4js';
import {returnResponse} from './resp';

// initialize log4js
log4js.configure({
    appenders: {
      cheeseLogs: { type: 'file', filename: 'cheese.log' },
      console: { type: 'console' }
    },
    categories: {
      cheese: { appenders: ['cheeseLogs'], level: 'error' },
      another: { appenders: ['console'], level: 'trace' },
      default: { appenders: ['console', 'cheeseLogs'], level: 'trace' }
    }
  });
console.log('Logger is initialized successfully.');

let logger = log4js.getLogger('main');

const handler404 = (ctx: Koa.Context)=> {
    return returnResponse(ctx, {success: 'false', message: 'not found'});
};


const init_server = async () => {
    const app : Koa = new Koa();

    app.use(KoaBodyParser);
    app.use(RouterCodes.routes());
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