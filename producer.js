  /////////////////////////////////Instances//////////////////////////////////////////////
var web3 = require('web3');
var Web3 = require('web3');
var web3 = new Web3();
var web3Admin = require('web3admin')
var express =  require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var other_servers = require('socket.io-client'); // This is a client connecting to the SERVER 2 (MAIN SERVER)
var other_server = other_servers.connect('http://localhost:4000', {reconnect: true});
var value_meter;
//Serial Port
var string = "";
// var SerialPort = require("serialport");
// var serialport = new SerialPort('/dev/cu.usbmodem1421',{parser: SerialPort.parsers.Readline('\n')});
var SerialPort = require('serialport');
var Readline = SerialPort.parsers.Readline;
var serialport = new SerialPort('/dev/cu.wchusbserial1410');
var parser = new Readline('\n');
serialport.pipe(parser);

var serialPort = require('serialport');
var port = new serialPort('/dev/cu.usbserial', {
  baudRate: 115200,
  parser: new serialPort.parsers.Readline('\n\r')

});




//Variables Declaration
var change = 1;
var _bid0 = 0; var _bid1 = 0; var _bid2 = 0; var _bid3 = 0; var _bid4 = 0; var _bid5 = 0;
var list = []
var tokens;
var kWh = 0;
var kWhprev = 0;
var difference = 0;
var address0; var address1; var address2; var address3; var address4; var address5;
var address6; var address7; var address8; var address9; var address10; var address11;
var prosumer0; var prosumer1; var prosumer2; var prosumer3; var prosumer4; var prosumer5;
var consumer0; var consumer1; var consumer2; var consumer3; var consumer4; var consumer5;
var bid0; var bid1; var bid2; var bid3; var bid4; var bid5;
var marker = 0;

//Contract Deployment
var abi = [{"constant":false,"inputs":[{"name":"_account","type":"address"}],"name":"token_balance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_account","type":"address"}],"name":"eth_balance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_account","type":"address"},{"name":"amount","type":"uint256"}],"name":"send_eth","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_account","type":"address"},{"name":"amount","type":"uint256"}],"name":"update_tokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
var contract_address = "0x247737b743841B8693b97Ed62ba9718a5a6d42dC" ;   //this is the Nordic Energy token generation and ether sending contract
var obj = web3.eth.contract(abi).at("0x247737b743841B8693b97Ed62ba9718a5a6d42dC");

//Web3  setup
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
web3.eth.defaultAccount = web3.eth.accounts[0];
web3Admin.extend(web3);


port.on('open',function(){
  console.log("open");


setInterval(function(){
  port.write(Buffer.from('SHOW=\r\n'), function(err) {
  console.log(string);
  KWH_index = string.indexOf("KWH", 0);
  console.log("Index:");
  console.log(KWH_index);
  value_meter = string.substring(KWH_index+8,KWH_index+9);
  kWh = 1 + Number(value_meter);
  console.log(kWh);

  string = "";
   if (err) {
     return console.log('Error on write: ', err.message);
   }
 });
},5000)
  port.on('data', function (data) {
    string = string + data.toString();
  });
});
//
//


serialport.on('open', function()
{
  console.log("awadhut");
  other_server.on('connect', function(){  });

//Close Connection
other_server.on('close',function(data)
{
  serialport.write('2');
  marker = 0 ;
  change = 1 ;
});

//Accept Bid
other_server.on('accept_0',function(data)
{
  address0 = data.add0;
  address6 = data.add6;
  bid0 = data.bid0;
  if(address6==web3.eth.accounts[0])
  {
    marker = 1 ;
    serialport.write('1');
  }
});

other_server.on('accept_1',function(data)
{
  address1 = data.add1;
  address7 = data.add7;
  bid1 = data.bid1;
  if(address7==web3.eth.accounts[0])
  {
    marker = 2 ;
    serialport.write('1');
  }
});

other_server.on('accept_2',function(data)
{
  address2 = data.add2;
  address8 = data.add8;
  bid2 = data.bid2;
  if(address8==web3.eth.accounts[0])
  {
    marker = 3;
    serialport.write('1');
  }
});

other_server.on('accept_3',function(data)
{
  address3 = data.add3;
  address9 = data.add9;
  bid3 = data.bid3;
  if(address9==web3.eth.accounts[0])
  {
    marker = 4;
    serialport.write('1');
  }
});

other_server.on('accept_4',function(data)
{
  address4 = data.add4;
  address10 = data.add10;
  bid4 = data.bid4;
  if(address10==web3.eth.accounts[0])
  {
    marker = 5;
    serialport.write('1');
  }
});

other_server.on('accept_5',function(data)
{
  address5 = data.add5;
  address11 = data.add11;
  bid5 = data.bid5;
  if(address11==web3.eth.accounts[0])
  {
    marker = 6;
    serialport.write('1');
  }
});

//Accept request for Displaying Tokens on Wallet
other_server.on('req_tokens0',function(data)
{
  if(data == web3.eth.accounts[4])
  {
    other_server.emit('display_tokens0',tokens);
  }
});

other_server.on('req_tokens1',function(data)
{
  if(data == web3.eth.accounts[4])
  {
    other_server.emit('display_tokens1',tokens);
  }
});

other_server.on('req_tokens2',function(data)
{
  if(data == web3.eth.accounts[4])
  {
    other_server.emit('display_tokens2',tokens);
  }
});

other_server.on('req_tokens3',function(data)
{
  if(data == web3.eth.accounts[4])
  {
    other_server.emit('display_tokens3',tokens);
  }
});

other_server.on('req_tokens4',function(data)
{
  if(data == web3.eth.accounts[4])
  {
    other_server.emit('display_tokens4',tokens);
  }
});

other_server.on('req_tokens5',function(data)
{
  if(data == web3.eth.accounts[4])
  {
    other_server.emit('display_tokens5',tokens);
  }
});

//Login Procedue
app.use(express.static('public'));

app.get('/', function(req, res)
{
  res.sendfile('index.html');
  io.once('connection', function (socket)
  {
    socket.on('password1', function (data)
    {
      var unlock = web3.personal.unlockAccount(web3.eth.accounts[0],data,100000);
      socket.emit('true',unlock);
    });
  });
});

//Wallet Functions
app.get('/enter_wallet', function(req, res)
{
  res.sendfile('wallet.html');

  // parser.on('data', function(data)
  // {
  //   kWh = data.toString();
  //   //console.log(kWh);
  // });

  io.on('connection', function (socket)
  {
    socket.on('startmine',function(socket)
    {
      var Mine = web3.miner.start();
    });
    socket.on('stopmine',function(socket)
    {
      var StopMine = web3.miner.stop();
    });
    socket.on('basic_tx',function(data)
    {
      from_address = web3.eth.accounts[0];
      to_address = data.add;
      value = data.val;
      var send = web3.eth.sendTransaction({from : from_address, to: to_address , value:value})
    });

    setInterval(function()
    {
      difference= kWh - kWhprev;
      var balance = web3.eth.getBalance(web3.eth.accounts[4]);
      socket.emit('list',{tx_1:list[0],tx_2:list[1],tx_3:list[2]});
      socket.emit('energy',{energy:kWh,tok:tokens,bal:balance});
      if(kWh!=0)   /// if(difference!=0)
      {
        obj.update_tokens(web3.eth.accounts[4],kWh);
        kWhprev = kWh;
      }
      list = web3.eth.getBlock("pending").transactions;
      tokens = obj.token_balance.call(web3.eth.accounts[4]);
      console.log("tokens ", tokens);
    },1000);
  });
});

setInterval(function()
{
  if (marker == 1 && change == 1)
  {
    prosumer0 = address0;
    consumer0 = address6;
    _bid0 = bid0;
    change = 2;
  }
  if (marker == 1)
  {
    obj.send_eth(prosumer0,_bid0,{from:consumer0,to:contract_address,value:_bid0});
  }

  if (marker == 2 && change == 1)
  {
    prosumer1 = address1;
    consumer1 = address7;
    _bid1 = bid1;
    change = 2;
  }
  if (marker == 2)
  {
    obj.send_eth(prosumer1,_bid1,{from:consumer1,to:contract_address,value:_bid1});
  }

  if (marker == 3 && change == 1)
  {
    prosumer2 = address2;
    consumer2 = address8
    _bid2 = bid2;
    change = 2;
  }
  if (marker == 3)
  {
    obj.send_eth(prosumer2,_bid2,{from:consumer2,to:contract_address,value:_bid2});
  }

  if (marker == 4 && change == 1)
  {
    prosumer3 = address3;
    consumer3 = address9;
    _bid3 = bid3;
    change = 2;
  }
  if (marker == 4)
  {
    obj.send_eth(prosumer3,_bid3,{from:consumer3,to:contract_address,value:_bid3});
  }

  if (marker == 5 && change == 1)
  {
    prosumer4 = address4;
    consumer4 = address10;
    _bid4 = bid4;
    change = 2;
  }
  if (marker == 5)
  {
    obj.send_eth(prosumer4,_bid4,{from:consumer4,to:contract_address,value:_bid4});
  }

  if (marker == 6 && change == 1)
  {
    prosumer5 = address5;
    consumer5 = address11;
    _bid5 = bid5;
    change = 2;
  }
  if (marker == 6)
  {
    obj.send_eth(prosumer5,_bid5,{from:consumer5,to:contract_address,value:_bid5});
  }
},8000);
});
// });
//HTTP SERVER
http.listen(3000, function()
{
  console.log('listening on *:3000');
});
