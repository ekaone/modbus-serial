const SerialPort = require("@serialport/stream");
const MockBinding = require("@serialport/binding-mock");

SerialPort.Binding = MockBinding;

// Create a port and enable the echo and recording.
MockBinding.createPort("/dev/ROBOT", { echo: true, record: true });
const port = new SerialPort("/dev/ROBOT");
