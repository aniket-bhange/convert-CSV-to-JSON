var express = require('express');
var _ = require('underscore');
var app = express();
var Converter = require("csvtojson").Converter;
var converter = new Converter({});

var checkCsv = function(url) {
  var link = url.trim();
  var fileExtention = link.substr(link.length - 3);
  return fileExtention.toLowerCase();
}

app.get('/csv/to/json', function (req, res) {
  // res.send(req.query);
  var link = _.first(_.values(req.query));
  if(_.isEmpty(link)){
    return res.send({exitCode:11000, response:"No Url found in query string"});
  }else if(checkCsv(String(link)) !== 'csv'){
    return res.send({exitCode:12000, response:"File is not CSV"});
  }
  converter.on("end_parsed", function (jsonArray) {
     res.send(jsonArray);
  });
  require("request").get(link).pipe(converter);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
