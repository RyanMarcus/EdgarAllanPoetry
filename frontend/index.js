var express = require('express');
var app = express();

const pythonShell = require('python-shell');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

const mustache = require('mustache-express');
app.engine('mustache', mustache());
app.set('view engine', 'mustache');

app.get('/', function (req, res) {
  var options = { pythonPath: 'python3'}
  pythonShell.run('generate_poem.py', options, function(err, poem) {
    // if (err) throw err;
    res.render('turing', {poem});
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
