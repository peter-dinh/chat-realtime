var socket = io("http://localhost:8000");

$(document).ready(function(){
    $("#send").click(function(){
        console.log("click");
        socket.emit('chat', {
            name: $("#name").val(),
            message: $("#message").val()
        })
    });
});

$("#message").keypress(function(){
    socket.emit('typing', $("#name").val())
});

socket.on('server_send', function(data){
    $(".feedback").empty();
    $(".box").append("<p><strong>"+ data.name +": </strong> "+ data.message +"</p>");

        $(".box").animate({ scrollTop: $('.box').prop("scrollHeight") }, 500);

});

socket.on('server_send_typing', function(data){
    $(".feedback").html("<p><em>"+ data +"</em> is typing a message ... </p>")
})
