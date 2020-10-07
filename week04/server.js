var fs= require('fs');

var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/',function(req,res){
  res.send('Hello World');
});

var https = require('https');
var options = {
  key: fs.readFileSync('star_itp_io.key'),
  cert: fs.readFileSync('star_itp_io.pem')
};

var httpServer = https.createServer(options,app);

httpServer.listen(443);

console.log('server is running');


var io = require('socket.io').listen(httpServer);

io.sockets.on('connection', function (socket) {
		console.log("We have a new client: " + socket.id);

		socket.on('image',
			function (data) {
				console.log("I got image " );
				io.emit("image", data);
			}
		);

    // socket.on('video',
    //   function (data) {
    //     console.log("I got image " );
    //     io.emit("video", data);
    //   }
    // );

		socket.on('otherevent', function(data) {
			console.log("Received: 'otherevent' " + data);
		});

		socket.on('disconnect', function() {
			console.log("Client has disconnected");
		});
	}
);
