$(document).ready(function() {
    $("#poem1Button").click(function() {
    	var trial_id = $("#poem1Button").attr("trial_id");
    	var poem_id = 0;
    	$.post("/ajaxSendData",
    	       {'trial_id': trial_id,
    		'answer': poem_id},
    	       function () {});

    	updatePoems();
    });

    $("#poem2Button").click(function() {
    	var trial_id = $("#poem2Button").attr("trial_id");
    	var poem_id = 1;
    	$.post("/ajaxSendData",
    	       {'trial_id': trial_id,
    		'answer': poem_id},
    	       function () {});

    	updatePoems();
    });
});

function updatePoems(){
    $.ajax({url: "/ajaxGetData", success: function(result){
  	document.getElementById('choice1').innerHTML = result.poem1;
  	document.getElementById('choice2').innerHTML = result.poem2;

	$('#choice1').css('background-color', result.poem1color);
	$('#choice2').css('background-color', result.poem2color);
	
  	$('#poem1Button').attr('trial_id', result.trial_id);
  	$('#poem2Button').attr('trial_id', result.trial_id);
    }});
}
