"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const KoaRouter = require("koa-router");
const KoaStatic = require("koa-static");
const services = require("./services");
const template_1 = require("./template");
const swaggerJSDoc = require('swagger-jsdoc');
const resp_1 = require("./resp");
// const Koa = require('koa');
// const KoaRouter = require('koa-router');
// const KoaStatic = require('koa-static');
const router = new KoaRouter();
async function init(app) {
    var options = {
        swaggerDefinition: {
            info: {
                title: 'Zabbix Codes Management',
                version: '1.0.0',
                description: 'Zabbix Codes Management System APIs'
            },
            basePath: "/api",
            swagger: "2.0",
            tags: [
                {
                    name: "Codes",
                    description: "Codes management related operation"
                },
                {
                    name: "Contacts",
                    description: "Contacts management related operation"
                },
                {
                    name: "Systems",
                    description: "Systems management related operation"
                },
                {
                    name: "Support",
                    description: "Some support APIs"
                }
            ]
        },
        apis: ['./src/routes/*.ts'],
    };
    // Initialize swagger-jsdoc -> returns validated swagger spec in json format
    const swaggerSpec = swaggerJSDoc(options);
    router.get('/swagger/api-docs.json', async (ctx, next) => {
        ctx.set('Content-Type', 'application/json');
        ctx.body = swaggerSpec;
    });
    router.get('/codes/:code', async (ctx, next) => {
        let code = ctx.params.code;
        let rows = await services.queryByCode(code);
        if (rows == null) {
            let ret = { success: false, message: '没有相关记录' };
            return resp_1.returnResponse(ctx, ret);
        }
        // let ret = {success: true, data: rows};
        // return returnResponse(ctx, ret);
        ctx.set('Context-Type', 'application/html');
        ctx.body = template_1.renderHtml('codes.mustache', rows);
    });
    // Use public as root directory
    app.use(KoaStatic('./public'));
    app.use(router.routes());
}
exports.init = init;
