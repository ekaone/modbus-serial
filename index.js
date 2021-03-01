// create an empty modbus client
var ModbusRTU = require("modbus-serial");
var client = new ModbusRTU();

// open connection to a serial port
client.connectRTUBuffered("COM6", { baudRate: 38400 });
client.setID(2);

// read the values of 10 registers starting at address 0
// on device number 1. and log the values to the console.
setInterval(function () {
  client.readInputRegisters(1002, 2, function (err, data) {
    console.log(data.data);
  });
}, 1000);
