var express = require('express');
var fs = require('fs');
var path = require('path');
var { 
  parse: svgsonParse,
  stringify: svgsonStringify
} = require('svgson')

var router = express.Router();

router.get('/svgson', function(req, res, next) {
  res.render('svgson', {});
});

router.post('/svgson/updateSVGImageColors', function(req, res, next) {
    // 3 colors provided to stylize the SVG image
    var { color1, color2, color3 } = req.body;

    // load the original SVG image from the server's file system
    var svgImageXML = loadSVGImageXML('paint.svg');

    // use svgson to convert the SVG XML to a JSON object
    svgsonParse(svgImageXML).then(json => {

      // get the shape container that contains the paths to be manipulated
      gElement = json.children.find(elem => elem.name == 'g' 
        && elem.attributes.id == 'g1727');      
      
      // update styles on specific path shapes
      updatePathStyleById(gElement, 'path995', 'fill:#000000', 'fill:' + color1);
      updatePathStyleById(gElement, 'path996', 'fill:#ffffff', 'fill:' + color2);
      updatePathStyleById(gElement, 'path997', 'fill:#ffffff', 'fill:' + color3);

      // convert JSON object back to SVG XML
      svgImageXML = svgsonStringify(json);

      // return SVG XML
      res.status(200).send(svgImageXML);
    });
});

function updatePathStyleById(containerElem, pathId, oldStyle, newStyle) {
  pathElem = containerElem.children.find(elem => elem.attributes.id == pathId);
  pathElem.attributes.style = pathElem.attributes.style.replace(
    oldStyle, newStyle);
}

function loadSVGImageXML(filename) {
  var svgImagePath = path.join(__dirname, '..', 'public', 'images', filename);
  return fs.readFileSync(svgImagePath, 'utf8');
}

module.exports = router;