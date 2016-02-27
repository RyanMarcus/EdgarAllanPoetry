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
    var arr = result.split("#");
    document.getElementById('poem1').innerHTML = arr[0];
    document.getElementById('poem2').innerHTML = arr[1];
    $('#poem1Button').attr('poem_id', arr[2]);
    $('#poem2Button').attr('poem_id', arr[3]);
  }});
}
