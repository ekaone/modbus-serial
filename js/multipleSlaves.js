const ModbusRTU = require("modbus-serial");
// create an empty modbus client
const client = new ModbusRTU();
// open connection to a serial port
client.connectRTUBuffered("/dev/ttyS0", { baudRate: 9600 });
// set timeout, if slave did not reply back
client.setTimeout(500);

// list of meter's id
const metersIdList = [10, 11, 12, 13, 14];

const getMetersValue = async (meters) => {
  try {
    // get value of all meters
    for (let meter of meters) {
      // output value to console
      console.log(await getMeterValue(meter));
      // wait 100ms before get another device
      await sleep(100);
    }
  } catch (e) {
    // if error, handle them here (it should not)
    console.log(e);
  } finally {
    // after get all data from salve repeate it again
    setImmediate(() => {
      getMetersValue(metersIdList);
    });
  }
};

const getMeterValue = async (id) => {
  try {
    // set ID of slave
    await client.setID(id);
    // read the 1 registers starting at address 0 (first register)
    let val = await client.readInputRegisters(0, 1);
    // return the value
    return val.data[0];
  } catch (e) {
    // if error return -1
    return -1;
  }
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// start get value
getMetersValue(metersIdList);
