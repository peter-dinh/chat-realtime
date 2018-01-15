const mongo_client = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const nameDB = 'appchat';

var express = require('express');
var app = express();

app.use(express.static('assets'));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(8000);

mongo_client.connect(url, function(err, client){
    if(err){
        throw err;
    }

    console.log('Connection success!');

    const database = client.db(nameDB);

    io.on('connection', function(socket){
        let chat = database.collection('chat');

        chat.find().sort({_id: 1}).toArray(function(err, res){
            if(err){
                throw err;
            }
            io.sockets.emit('output', res);
        });

        socket.on('chat', function(data){
            console.log(data);
            chat.insert({name: data.name, message: data.message});

            io.sockets.emit('server_send', data);
        });

        socket.on('typing', function(data){
            console.log(data);
            socket.broadcast.emit('server_send_typing', data)
        });
    });

    

});


app.get('/', function(req,res){
    res.render("index");
});