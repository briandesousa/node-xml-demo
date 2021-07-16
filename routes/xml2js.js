var express = require('express');
var router = express.Router();

router.get('/xml2js/', function(req, res, next) {
  res.render('xml2js', {});
});

// xml2js and express-xml-bodyparser example: retrieve customer using XML
router.post('/xml2js/customer', (req, res, next) => {
  console.log('Raw XML: ' + req.rawBody);
  console.log('Parsed XML: ' + JSON.stringify(req.body));
  if (req.body.retrieveCustomer) {
    var id = req.body.retrieveCustomer.id;
    res.send(`<customer><id>${id}</id><fullName>Bob Smith</fullName></customer>`);
  } else {
    res.status(400).send('Unexpected XML received, missing <retrieveCustomer> tag');
  }
});

// XML tester page
router.get('/xml2js/xml-tester', (req, res, next) => {
  res.render('xml-tester', { 
    sampleXmlRequest: 
`<sessionInfo id="45664434343">
  <customerId>39399444</customerId>
  <customerName>Bob Smith</customerName>
  <token>343ldf0bk343bz43lddd</token>
</sessionInfo>`
   });
});

// XML tester endpoint to send XML messages to
router.post('/xml2js/xml-tester', (req, res, next) => {
  console.log('Request received: ' + JSON.stringify(req.body));
  if (req.body.sessionInfo) {
    var sessionid = req.body.sessionInfo['$'].id;
    console.log(`Request received with sessionid ${sessionid}`);
    res.send(
`<sessionEstablished>
  <originalSessionid>${sessionid}</originalSessionid>
  <newSessionId>3434k34k34k3fdafafd</newSessionId>
</sessionEstablished>`);
  } else {
    throw 'Unexpected request body received'
  }
});


module.exports = router;