var express = require('express');
var app = express();

app.use(express.static('assets'));
app.set("view engine", "ejs");
app.set("views", "./views");


var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(8000);

io.on("connection", function(socket){
    //console.log("co nguoi zo : " + util.inspect(socket.adapter.rooms, false, null));
    socket.on('chat', function(data){
        console.log(data);
        io.sockets.emit('server_send', data);
    });

    socket.on('typing', function(data){
        console.log(data);
        socket.broadcast.emit('server_send_typing', data)
    });
});

app.get('/', function(req,res){
    res.render("index");
});