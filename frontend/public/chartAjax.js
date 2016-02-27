var markovData = [
    {
	label: 'Markov Chain Correct',
	value: 5,
	color: '#811BD6'
    },
    {
	label: 'Markov Chain Incorrect',
	value: 5,
	color: '#6AE128'
    }
];
var rnnData = [
    {
	label: 'Recurrent Neural Network Correct',
	value: 5,
	color: '#811BD6'
    },
    {
	label: 'Recurrant Neural Network Incorrect',
	value: 5,
	color: '#6AE128'
    }
];
var markovChart;
var rnnChart;
$(document).ready(function()
		  {
		      //alert("document ready");
		      var markovContext = document.getElementById('markov').getContext('2d');
		      markovChart = new Chart(markovContext).Pie(markovData);
		      var rnnContext = document.getElementById('rnn').getContext('2d');
		      rnnChart = new Chart(rnnContext).Pie(rnnData);
		      getTotals();

		      setInterval(function(){
			  getTotals();
		      }, 1000);
		  })
function getTotals() {
    $.ajax({url: "/eap/chartInfo", success: function(result){
	//alert(result.markovRight);
	if (markovChart.segments[0].value != result.markovRight || markovChart.segments[1].value != (result.markovTotal - result.markovRight))
	{
	    markovChart.segments[0].value = result.markovRight;
	    markovChart.segments[1].value = result.markovTotal-result.markovRight;
	    markovChart.update();
	}
	if (rnnChart.segments[0].value != result.rnnRight || rnnChart.segments[1].value != (result.rnnTotal - result.rnnRight)) {
	    rnnChart.segments[0].value = result.rnnRight;
	    rnnChart.segments[1].value = result.rnnTotal-result.rnnRight;
	    rnnChart.update();
	}


	console.log(JSON.stringify(result));
	$("#markovP").text(100-(~~((result.markovRight / result.markovTotal)*100)) + "%");
	
	$("#rnnP").text(100-(~~((result.rnnRight / result.rnnTotal)*100)) + "%");

	
	
    }});

}
