var express = require('express');
var router = express.Router();
var libxmljs = require('libxmljs2');
var fs = require('fs');
var path = require('path');

router.get('/', function(req, res, next) {
  res.render('libxmljs2', {});
});

router.post('/validateSessionXmlWithSchema', (req, res, next) => {
  var xmlData = decodeURI(req.body.xmlData);
  var xmlSchema = decodeURI(req.body.xmlSchema);
  var xmlDoc = libxmljs.parseXml(xmlData);
  var xmlSchemaDoc = libxmljs.parseXml(xmlSchema);
  var validationResult = xmlDoc.validate(xmlSchemaDoc);

  var response = {
    valid: validationResult,
    validationErrors: `${xmlDoc.validationErrors}`
  };

  res.send(JSON.stringify(response));
});

function loadXmlSchema(filename) {
  var schemaPath = path.join(__dirname, '..', 'schemas', filename);
  var schema = fs.readFileSync(schemaPath, 'utf8');
  return libxmljs.parseXml(schema); 
}

router.post('/validateSessionXml', (req, res, next) => {
  var xmlData = req.rawBody;

  // parse incoming XML data
  var xmlDoc = libxmljs.parseXml(xmlData);  

  // load XML schema from file system
  var xmlSchemaDoc = loadXmlSchema('session-info.xsd');

  // validate XML data against schema
  var validationResult = xmlDoc.validate(xmlSchemaDoc);

  // return success or failure with validation errors
  if (validationResult) {
    res.status(200).send('validation successful');
  } else {
    res.status(400).send(`${xmlDoc.validationErrors}`);
  }  
});

module.exports = router;
