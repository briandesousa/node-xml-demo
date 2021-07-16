var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');

router.get('/cheerio/', function(req, res, next) {
  res.render('cheerio', {});
});

router.post('/cheerio/highlightTable', (req, res, next) => {
  // decode HTML in request body
  var decodedHtml = decodeURI(req.body.encodedHtml);

  try {
    // parse incoming HTML fragment
    var $ = cheerio.load(decodedHtml);
    
    // use the cheerio selector to locate all table cells in the HTML fragment
    $('td').each(function() {
      tableCellText = $(this).text();
      tableCellNumber = parseFloat(tableCellText);
      if (tableCellNumber) {
        // highlight cells based on their numeric value
        if (tableCellNumber >= 0) {
          $(this).prop('style', 'background-color: #90ee90');
        } else {
          $(this).prop('style', 'background-color: #fa8072');
        }
      }
    });
  } catch(err) {
    return res.status(500).send({ error: err});
  }
  
  // only return the HTML fragment that was received in the request
  updatedHtml = $('body').html();
  
  // return the manipulated HTML fragement
  res.status(200).send({ encodedHtml: encodeURI(updatedHtml) });
});


module.exports = router;