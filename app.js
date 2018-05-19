const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
	res.redirect('emitir.html');		
});

io.on('connection', (socket) => {
	console.log('Nuevo usuario! ' + socket.id);
	socket.on('stream', (image) => {
		socket.broadcast.emit('stream', image);
	});
});

http.listen(port, () => {
	console.log("Servidor escuchando en el puerto " + port + "!");
});