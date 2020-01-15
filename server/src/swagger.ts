import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
import * as KoaStatic from 'koa-static';
const swaggerJSDoc = require('swagger-jsdoc');
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
        apis: ['./routes/*.ts'], // Path to the API docs
      };

      // Initialize swagger-jsdoc -> returns validated swagger spec in json format
    const swaggerSpec = swaggerJSDoc(options);

    router.get('/swagger/api-docs.json', async (ctx: Koa.Context, next: any) => {
        ctx.set('Content-Type', 'application/json')
        ctx.body = swaggerSpec;
        await next();
    });

    // Use public as root directory
    app.use(KoaStatic('./public'));    
    app.use(router.routes());    
}
