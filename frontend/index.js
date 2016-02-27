var express = require('express');
var app = express();
app.use(express.static("css"));

const pythonShell = require('python-shell');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

const mustache = require('mustache-express');
app.engine('mustache', mustache());
app.set('view engine', 'mustache');

app.get('/', function (req, res) {
  var options = { pythonPath: 'python3'}
  pythonShell.run('generate_poem.py', options, function(err, fakePoem) {
    pythonShell.run('pick_selection.py', options, function(err, realPoem) {
      flip = Math.floor((Math.random() * 2));
      if (flip==1) {
        poem1 = fakePoem;
        poem2 = realPoem;
      } else {
        poem1 = realPoem;
        poem2 = fakePoem;
      }
      res.render('turing', {"poem1": poem1, "poem2": poem2, "flip": flip});
    })
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
