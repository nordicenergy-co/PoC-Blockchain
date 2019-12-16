var string;
var KWH_index;
var SerialPort = require('serialport');
var port = new SerialPort('/dev/ttyUSB0', {
  baudRate: 115200,
  parser: new SerialPort.parsers.Readline('\n\r')

});

port.on('open',function(){
  console.log("open");


setInterval(function(){
  port.write(Buffer.from('SHOW=\r\n'), function(err) {
  console.log(string);
  KWH_index = string.indexOf("KWH", 0);
  console.log("Index:");
  console.log(KWH_index);
   if (err) {
     return console.log('Error on write: ', err.message);
     string = "";
   }
   // console.log('message written');
 });
  // port.write(0x0D0A);

},5000)

  // port.on('data', function (data) {
  //   console.log('Data:', data);
  // });
  port.on('data', function (data) {
    string = string + data.toString();

  });
  // port.on('data', function (data) {
  //   var str = data.toString();
  //   var res = str.substring(1, 4);
  // });


});