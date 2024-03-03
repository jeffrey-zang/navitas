const { SerialPort } = require('serialport')
const port = new SerialPort({ path: '/dev/tty.usbmodem101', baudRate: 9600 })

// Open errors will be emitted as an error event
port.on('error', function(err) {
  console.log('Error: ', err.message)
})

// Switches the port into "flowing mode"
// port.on('data', function (data) {
//   console.log(data.toString())
// })

port.on('readable', function () {
  console.log(port.read().toString())
})