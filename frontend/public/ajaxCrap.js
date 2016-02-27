$(document).ready(function() {
    $("#poem1Button").click(function() {
	var id = $("#poem1Button").attr("poem_id");
	$.post("/ajaxSendData", {'id': id}, function(result){
            alert(result.id);
	});
	updatePoems();
    });
});

function updatePoems(){
    $.ajax({url: "/ajaxGetData", success: function(result){
	
	document.getElementById('choice1').innerHTML = result.poem1;
	document.getElementById('choice2').innerHTML = result.poem2;
	$('#poem1Button').attr('poem_id', result.poem1_id);
	$('#poem2Button').attr('poem_id', result.poem2_id);
    }});
}
