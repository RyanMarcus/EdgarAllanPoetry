$(document).ready(function() {
    $("#poem1Button").click(function() {
    	var trial_id = $("#poem1Button").attr("trial_id");
    	var poem_id = 0;
    	$.post("/eap/ajaxSendData",
    	       {'trial_id': trial_id,
    		'answer': poem_id},
    	       function (res) {
		   console.log(JSON.stringify(res));
		   updateCounter(res.result);
	       });

    	updatePoems();
    });

    $("#poem2Button").click(function() {
    	var trial_id = $("#poem2Button").attr("trial_id");
    	var poem_id = 1;
    	$.post("/eap/ajaxSendData",
    	       {'trial_id': trial_id,
    		'answer': poem_id},
    	       function (res) {
		   console.log(JSON.stringify(res));
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

    $("#score").text(percent + "%");
	
}

function updatePoems(){
    $.ajax({url: "/eap/ajaxGetData", success: function(result){
  	document.getElementById('choice1').innerHTML = result.poem1;
  	document.getElementById('choice2').innerHTML = result.poem2;

  	$('#choice1').css('background-color', result.poem1color);
  	$('#choice2').css('background-color', result.poem2color);
    $('#choice1').css('color', result.poem1textcolor);
  	$('#choice2').css('color', result.poem2textcolor);

  	$('#poem1Button').attr('trial_id', result.trial_id);
  	$('#poem2Button').attr('trial_id', result.trial_id);
    }});
}
