import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
import * as KoaStatic from 'koa-static';
import * as KoaMount from 'koa-mount';
import * as services from './services';
import {renderHtml} from './template';
const swaggerJSDoc = require('swagger-jsdoc');
import {returnResponse, returnSuccess, buildSuccess} from './resp';
// const Koa = require('koa');
// const KoaRouter = require('koa-router');
// const KoaStatic = require('koa-static');

const router = new KoaRouter();

export async function init(app: Koa) {
    var options = {
        swaggerDefinition: {
          info: {
            title: 'Zabbix Codes Management', // Title (required)
            version: '1.0.0', // Version (required),
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
        apis: ['./src/routes/*.ts'], // Path to the API docs
      };

      // Initialize swagger-jsdoc -> returns validated swagger spec in json format
    const swaggerSpec = swaggerJSDoc(options);

    router.get('/swagger/api-docs.json', async (ctx: Koa.Context, next: any) => {
        ctx.set('Content-Type', 'application/json')
        ctx.body = swaggerSpec;
    });

    router.get('/codes/:code', async (ctx, next) => {
        let code = ctx.params.code;
        let rows = await services.queryByCode(code);
        if (rows==null) {
          let ret = {success: false, message: '没有相关记录'}
          return returnResponse(ctx, ret);
        }
        // let ret = {success: true, data: rows};
        // return returnResponse(ctx, ret);
        ctx.set('Context-Type', 'application/html');
        ctx.body = renderHtml('codes.mustache', rows);
    });

    // Use public as root directory
    app.use(KoaMount('/static', KoaStatic('./public/static')));
    app.use(KoaMount('/swagger', KoaStatic('./public/swagger')));
    app.use(KoaMount('/', KoaStatic('./public/dist')));
    app.use(router.routes());
}
