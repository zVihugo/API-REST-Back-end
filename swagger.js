const swaggerAutogen = require('swagger-autogen')();

output = './doc_swagger.json';
endpoints = ['./app.js'];

swaggerAutogen(output, endpoints);