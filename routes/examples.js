var express = require('express');
var router = express.Router();

// display examples page
router.get('/', function(req, res, next) {
  res.render('examples', {});
});

// retrieve customer info using an XML request and response
router.post('/customer', function(req, res, next) {
  console.log('Raw XML: ' + req.rawBody);
  console.log('Parsed XML: ' + JSON.stringify(req.body));
  if (req.body.retrieveCustomer) {
    var id = req.body.retrieveCustomer.id;
    res.send(`<customer><id>${id}</id><fullName>Bob Smith</fullName></customer>`);
  } else {
    res.status(400).send('Unexpected XML received, missing <retrieveCustomer> tag');
  }
});

module.exports = router;
