const fs = require('fs');
const util = require('util');
const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const readFile = util.promisify(fs.readFile);

async function createSwagger(config) {
  const description = (await readFile(config.descriptionPath)).toString();

  const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: config.title,
      description,
      version: config.version,
    },
  };

  const options = {
    swaggerDefinition,
    // apis: [path.join(__dirname, '../router/*.js'), path.join(__dirname, './components.yaml')],
    apis: [path.join(__dirname, '../router/*.yaml'), path.join(__dirname, './components.yaml')],
  };

  const swaggerSpec = swaggerJSDoc(options);

  return {
    serve: swaggerUi.serve,
    handle: swaggerUi.setup(swaggerSpec, { explorer: true }),
    jsonData: swaggerSpec,
  };
}

module.exports = createSwagger;
