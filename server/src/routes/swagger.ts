import * as KoaRouter from 'koa-router';
const swaggerJSDoc = require('swagger-jsdoc');

const router = new KoaRouter({prefix: '/api/codes'});

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

router.get('/swagger/api-docs.json', async (ctx, next) => {
    ctx.set('Content-Type', 'application/json')
    ctx.body = swaggerSpec;
});

export default router;