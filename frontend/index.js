var express = require('express');
var app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

const mustache = require('mustache-express');
app.engine('mustache', mustache());
app.set('view engine', 'mustache');

app.get('/', function (req, res) {
  res.render('turing', {});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
