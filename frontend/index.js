var express = require('express');
var app = express();
app.use(express.static('public'));
const pythonShell = require('python-shell');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

const mustache = require('mustache-express');
app.engine('mustache', mustache());
app.set('view engine', 'mustache');

var testing = true;

var dict = {};

dict['current_id'] = 0;
dict['correct_ids'] = new Set();

app.get('/', function (req, res) {
  var options = { pythonPath: 'python3'}
  pythonShell.run('generate_poem.py', options, function(err, fakePoem) {
    pythonShell.run('pick_selection.py', options, function(err, realPoem) {
      flip = Math.floor((Math.random() * 2));
      var current_id = dict['current_id']
      dict['current_id'] = current_id + 2;
      poem1_id = current_id + 1;
      poem2_id = current_id + 2;

      if (flip==1) {
        dict['correct_ids'].add(poem2_id)
        poem1 = fakePoem;
        poem2 = realPoem;
      } else {
        dict['correct_ids'].add(poem1_id)
        poem1 = realPoem;
        poem2 = fakePoem;
      }

      poem1 = poem1.join("<br/>");
      poem2 = poem2.join("<br/>");
      res.render('turing', {"poem1": poem1, "poem2": poem2, "poem1_id": poem1_id.toString(), "poem2_id": poem2_id.toString()});
    })
  });
});

app.post('/ajaxSendData', function(req, res) {
  res.send(req.body);
  //res.send(true);
});

app.get('/ajaxGetData', function(req, res){
//Copied from '/' because I didn't want to make 3 1 line methods
  var options = { pythonPath: 'python3'}
  pythonShell.run('generate_poem.py', options, function(err, fakePoem) {
    pythonShell.run('pick_selection.py', options, function(err, realPoem) {
      flip = Math.floor((Math.random() * 2));
      var current_id = 0
      current_id = dict['current_id']
      dict['current_id'] = current_id + 2
      poem1_id = current_id + 1;
      poem2_id = current_id + 2;
      console.log(realPoem);

      if (flip==1) {
        dict['correct_ids'].add(poem2_id)
        poem1 = fakePoem;
        poem2 = realPoem;
      } else {
        dict['correct_ids'].add(poem1_id)
        poem1 = realPoem;
        poem2 = fakePoem;
      }
      poem1 = poem1.join("<br/>");
      poem2 = poem2.join("<br/>");
      console.log("poem ids:");
      console.log(dict['correct_ids'])
      var result = poem1+'#'+poem2+'#' + poem1_id + '#' + poem2_id;
      res.send(result);
    })
  });
});
app.get('/scoreboard', function (req, res) {
  var people = [
    { "name": "John", "correct": 5, "incorrect": 5, "percent correct": "50%"},
    { "name": "Some other guy", "correct": 100, "incorrect": 25, "percent correct": "asfa$%"},
    { "name": "mmmhmmm", "correct": 22, "incorrect": 2, "percent correct": "%gds%"}
  ]
  res.render('scoreboard', {"people": people});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
