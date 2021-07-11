var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('xml-tester', { 
    sampleXmlRequest: 
`<sessionInfo id="45664434343">
  <customerId>39399444</customerId>
  <customerName>Bob Smith</customerName>
  <token>343ldf0bk343bz43lddd</token>
</sessionInfo>`
   });
});

router.post('/', function(req, res, next) {
  console.log('Request received: ' + JSON.stringify(req.body));
  if (req.body.sessioninfo) {
    var sessionid = req.body.sessioninfo['$'].id;
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
