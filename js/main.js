var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server)

//Server start
server.listen(8888, () => console.log('On port ' + 8888))

//user server
app.use(express.static(__dirname + '/public'));

io.on('connection', onConnection);

let connectedSocket = null;
function onConnection(socket) {
    connectedSocket = socket;
}

const { SerialPort } = require('serialport');
const port = new SerialPort({ path: '/dev/tty.usbmodem1101', baudRate: 9600 });  

port.on('error', function(err) {
    console.log('Error: ', err.message)
})

port.on('readable', function () {
    console.log(port.read().toString())
})