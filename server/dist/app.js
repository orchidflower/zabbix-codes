"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const KoaBodyParser = require("koa-bodyparser");
const RouterSwagger = require("./swagger");
const codes_1 = require("./routes/codes");
const log4js = require("log4js");
const resp_1 = require("./resp");
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
const handler404 = (ctx) => {
    return resp_1.returnResponse(ctx, { success: 'false', message: 'not found' });
};
const init_server = async () => {
    const app = new Koa();
    app.use(KoaBodyParser);
    app.use(codes_1.default.routes());
    await RouterSwagger.init(app);
    app.use(handler404);
    let listenPort = 3000;
    logger.info(`Starting server on port ${listenPort}...`);
    await app.listen(listenPort);
    logger.info('Server started.');
};
(async () => {
    init_server();
})();
