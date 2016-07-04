$(document).ready(function() {
    $("#humanButton").click(function() {
    	var trial_id = $("#humanButton").attr("trial_id");
    	var poem_id = 0;
    	$.post("/eap/ajaxSendData",
    	       {'trial_id': trial_id,
    		'answer': true},
    	       function (res) {
		   updateCounter(res.result);
	       });

    	updatePoems();
    });

    $("#computerButton").click(function() {
    	var trial_id = $("#computerButton").attr("trial_id");
    	var poem_id = 1;
    	$.post("/eap/ajaxSendData",
    	       {'trial_id': trial_id,
    		'answer': false},
    	       function (res) {
		   updateCounter(res.result);
	       });

    	updatePoems();
    });
});


var correct = 0;
var total = 0;
function updateCounter(result) {
    if (result)
	correct++;
    total++;
    var percent = ~~(100 * correct/total);

    $("#score").text(percent + "%" + " (" + correct + "/" + total + ")");
}

function updatePoems(){
    $.ajax({url: "/eap/ajaxGetData", success: function(result){
  	document.getElementById('choice1').innerHTML = result.poem1;

  	$('#choice1').css('background-color', result.poem1color);
  	$('#choice2').css('background-color', result.poem2color);
        $('#choice1').css('color', result.poem1textcolor);
  	$('#choice2').css('color', result.poem2textcolor);

  	$('#humanButton').attr('trial_id', result.trial_id);
  	$('#computerButton').attr('trial_id', result.trial_id);
    }});
}
