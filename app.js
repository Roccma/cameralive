const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
	res.redirect('index.html');		
});

io.on('connection', (socket) => {
	socket.on('stream', (image) => {
		socket.broadcast.emit('stream', image);
	});
});

http.listen(port, () => {
	console.log("Servidor escuchando en el puerto " + port + "!");
});