var swaggerJSDoc = require('swagger-jsdoc');
var express = require('express');
var router = express.Router();

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
  apis: ['./routes/*.js'], // Path to the API docs
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
var swaggerSpec = swaggerJSDoc(options);

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "./public/swagger/index.html"));
});

router.get('/api-docs.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

module.exports = router;