var express = require('express');
var app = express();
var Q = require("q");
app.use(express.static('public'));
const pythonShell = require('python-shell');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

const mustache = require('mustache-express');
app.engine('mustache', mustache());
app.set('view engine', 'mustache');

var testing = true;

var last_trial_id = 0;
var trials = {};


function getPoem(type) {
    var toR = Q.defer();
    var options = { pythonPath: 'python3'};

    if (type == "real") {
	pythonShell.run('pick_selection.py', options, function (err, poem) {
	    poem = poem.join("<br />");
	    toR.resolve(poem);
	});
    } else if (type =="rnn") {
	pythonShell.run('pick_selection_rnn.py', options, function (err, poem) {
	    poem = poem.join("<br />");
	    toR.resolve(poem);
	});
   	
    } else if (type == "markov") {
	pythonShell.run('pick_selection_markov.py', options, function (err, poem) {
	    poem = poem.join("<br />");
	    toR.resolve(poem);
	});
    }
    

    return toR.promise;
}

function generateTrial() {
    var toR = Q.defer();
    
    // pick if we are using RNN or Markov
    var type = (flip() == 0 ? "rnn" : "markov");
    var fake_id = flip();
    var trial_id = last_trial_id++;

    trials[trial_id] = {
	"fake_poem": fake_id,
	"type": type,
	"answer": false
    };

    var poems = [
	getPoem(fake_id == 0 ? type : "real"),
	getPoem(fake_id == 1 ? type : "real")
    ];

    return Q.all(poems).then(function (poems) {
	return {
	    "poems": poems,
	    "trial_id": trial_id
	};
    });
    
}

function flip() {
    return Math.floor((Math.random() * 2));
}

function tallyResults() {

    var rnnTotal = 0;
    var markovTotal = 0;
    var rnnRight = 0;
    var markovRight = 0;
    
    for (var key in trials) {
	var trial = trials[key];
	if (!trial.answer)
	    continue;

	if (trial.type == "rnn") {
	    rnnTotal++;
	    if (trial.fake_poem != trial.answer) {
		rnnRight++;
	    }
	    
	} else if (trial.type == "markov") {
	    markovTotal++;
	    if (trial.fake_poem != trial.answer) {
		markovRight++;
	    }
	    
	}
	
    }

    return {"rnnTotal": rnnTotal,
	    "markovTotal": markovTotal,
	    "rnnRight": rnnRight,
	    "markovRight": markovRight};
}


app.get('/', function (req, res) {
    generateTrial().then(function (trial) {
	res.render('turing',
		   { "poem1": trial.poems[0],
		     "poem2": trial.poems[1],
		     "trial_id": trial.trial_id
		   });

    });

});

app.post('/ajaxSendData', function(req, res) {
    trials[req.body.trial_id].answer = req.body.answer;

    console.log(tallyResults());
    res.send("");
});

app.get('/ajaxGetData', function(req, res){
    generateTrial().then(function (trial) {
	res.send({ "poem1": trial.poems[0],
		   "poem2": trial.poems[1],
		   "trial_id": trial.trial_id
		 });
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
