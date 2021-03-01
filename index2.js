// create an empty modbus client
var SerialPort = require("serialport");
var ModbusRTU = require("modbus-serial");
// var client = new ModbusRTU();
var serialPort = new SerialPort("COM5", {
  baudRate: 38400,
  // autoOpen: true,
  parity: "none",
  dataBits: 8,
});

// open connection to a serial port
// client.connectRTUBuffered("COM5", { baudRate: 38400, parity: "none" });
var client = new ModbusRTU(serialPort);
client.setID(2);

// read the values of 10 registers starting at address 0
// on device number 1. and log the values to the console.
setInterval(function () {
  client.readHoldingRegisters(1004, 2, function (err, data) {
    console.log(data.data);

    // try {
    //   console.log(data.data);
    // } catch (err) {
    //   console.error(err);
    // }
  });
}, 1000);
