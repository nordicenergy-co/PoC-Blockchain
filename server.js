var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express = require('express');

//Variables
var address_buyer_list = ["","","","","",""];
var address_seller_list = ["","","","","",""];
var tokens = ["","","","","",""];
var post0 = 0, post1 = 0, post2 = 0, post3 = 0, post4 = 0, post5 = 0;
var bid_value = [0,0,0,0,0,0];
var flag0 = 0,flag1 = 0,flag2 = 0,flag3 = 0,flag4 = 0,flag5 = 0;
var Card1; var Card2; var Card3; var Card4; var Card5; var Card6;


app.use(express.static('public'));

//Dashboard Functions
app.get('/', function(req, res)
{
  res.sendfile('dashboard.html');
  io.once('connection', function (socket)
  {
    socket.on('broadcast', function (data)
    {
      var add_temp = data.address;
      if(flag0==0 && post0==0)
      {
        io.emit('req_tokens0',add_temp);
        address_seller_list[0] = data.address;
        bid_value[0] = data.base;
        post0=1;
      }
      else if(flag1==0 && post1==0)
      {
        io.emit('req_tokens1',add_temp);
        address_seller_list[1] = data.address;
        bid_value[1] = data.base;
        post1=1;
      }
      else if(flag2==0 && post2==0)
      {
        io.emit('req_tokens2',add_temp);
        address_seller_list[2] = data.address;
        bid_value[2] = data.base;
        post2=1;
      }
      else if(flag3==0 && post3==0)
      {
        io.emit('req_tokens3',add_temp);
        address_seller_list[3] = data.address;
        bid_value[3] = data.base;
        post3=1;
      }
      else if(flag4==0 && post4==0)
      {
        io.emit('req_tokens4',add_temp);
        address_seller_list[4] = data.address;
        bid_value[4] = data.base;
        post4=1;
      }
      else if(flag5==0 && post5==0)
      {
        io.emit('req_tokens5',add_temp);
        address_seller_list[5] = data.address;
        bid_value[5] = data.base;
        post5=1;
      }
    });

    //Close Connection
    socket.on('close_connection', function (data)
    {
      io.emit('close',2);
    });

    //Bidding Functions
    socket.on('bid_for_0',function(data)
    {
      console.log("hi");
      if(!(address_seller_list[0]=="" || data==null))
      {
        clearTimeout(Card1);
        bid_value[0] = Number(bid_value[0]) + 1;
        address_buyer_list[0] = data;
        flag0 = 1;
      }
    });

    socket.on('bid_for_1',function(data)
    {
      if(!(address_seller_list[1]=="" || data==null))
      {
        clearTimeout(Card2);
        bid_value[1] = Number(bid_value[1]) + 1;
        address_buyer_list[1] = data;
        flag1 = 1;
      }
    });

    socket.on('bid_for_2',function(data)
    {
      if(!(address_seller_list[2]=="" || data==null))
      {
        clearTimeout(Card3);
        bid_value[2] = Number(bid_value[2]) + 1;
        address_buyer_list[2] = data;
        flag2 = 1;
      }
    });

    socket.on('bid_for_3',function(data)
    {
      if(!(address_seller_list[3]=="" || data==null))
      {
        clearTimeout(Card4);
        bid_value[3] = Number(bid_value[3]) + 1;
        address_buyer_list[3] = data;
        flag3 = 1;
      }
    });

    socket.on('bid_for_4',function(data)
    {
      if(!(address_seller_list[4]=="" || data==null))
      {
        clearTimeout(Card5);
        bid_value[4] = Number(bid_value[4]) + 1;
        address_buyer_list[4] = data;
        flag4 = 1;
      }
    });

    socket.on('bid_for_5',function(data)
    {
      if(!(address_seller_list[5]=="" || data==null))
      {
        clearTimeout(Card6);
        bid_value[5] = Number(bid_value[5]) + 1;
        address_buyer_list[5] = data;
        flag5 = 1;
      }
    });


    setInterval(function()
    {
      io.emit('post',
      {
        add0:address_seller_list[0],add1:address_seller_list[1],add2:address_seller_list[2],add3:address_seller_list[3],add4:address_seller_list[4],add5:address_seller_list[5],
        bid0:bid_value[0],bid1:bid_value[1],bid2:bid_value[2],bid3:bid_value[3],bid4:bid_value[4],bid5:bid_value[5],
        add6:address_buyer_list[0],add7:address_buyer_list[1],add8:address_buyer_list[2],add9:address_buyer_list[3],add10:address_buyer_list[4],add11:address_buyer_list[5],
        tok0:tokens[0],tok1:tokens[1],tok2:tokens[2],tok3:tokens[3],tok4:tokens[4],tok5:tokens[5]
      });
    },1000);
});
    setInterval(function()
    {
      console.log(flag0);
      if(flag0 == 1)
      {
        Card1 = setTimeout(function()
        {
          io.emit('accept_0',{add0:address_seller_list[0],bid0:bid_value[0],add6:address_buyer_list[0]});
          address_seller_list[0] = "";
          address_buyer_list[0] = "";
          bid_value[0] = 0;
          tokens[0] = "";
          flag0 = 0;
          post0 = 0;
          console.log("check");
          //console.log(flag0);
        },5000);
      }
      if(flag1 == 1)
      {
        Card2 = setTimeout(function()
        {
          io.emit('accept_1',{add1:address_seller_list[1],bid1:bid_value[1],add7:address_buyer_list[1]});
          address_seller_list[1] = "";
          address_buyer_list[1] = "";
          bid_value[1] = 0;
          tokens[1] = "";
          flag1 = 0;
          post1 = 0;
        },5000);
      }
      if(flag2 == 1)
      {
        Card3 = setTimeout(function()
        {
          io.emit('accept_2',{add2:address_seller_list[2],bid2:bid_value[2],add8:address_buyer_list[2]});
          address_seller_list[2] = "";
          address_buyer_list[2] = "";
          bid_value[2] = 0;
          tokens[2] = "";
          flag2 = 0;
          post2 = 0;
        },5000);
      }
      if(flag3 == 1)
      {
        Card4 = setTimeout(function()
        {
          io.emit('accept_3',{add3:address_seller_list[3],bid3:bid_value[3],add9:address_buyer_list[3]});
          address_seller_list[3] = "";
          address_buyer_list[3] = "";
          bid_value[3] = 0;
          tokens[3] = "";
          flag3 = 0;
          post3 = 0;
        },5000);
      }
      if(flag4 == 1)
      {
        Card5 = setTimeout(function()
        {
          io.emit('accept_4',{add4:address_seller_list[4],bid4:bid_value[4],add10:address_buyer_list[4]});
          address_seller_list[4] = "";
          address_buyer_list[4] = "";
          bid_value[4] = 0;
          tokens[4] = "";
          flag4 = 0;
          post4 = 0;
        },5000);
      }
      if(flag5 == 1)
      {
        Card6 = setTimeout(function()
        {
          io.emit('accept_5',{add5:address_seller_list[5],bid5:bid_value[5],add11:address_buyer_list[5]});
          address_seller_list[5] = "";
          address_buyer_list[5] = "";
          bid_value[5] = 0;
          tokens[5] = "";
          flag5 = 0;
          post5 = 0;
        },5000);
      }
    },10000);
  });



io.on('connection',function(socket)
{
  socket.on('display_tokens0',function(data)
  {
    tokens[0] = data;
  });
  socket.on('display_tokens1',function(data)
  {
    tokens[1] = data;
  });
  socket.on('display_tokens2',function(data)
  {
    tokens[2] = data;
  });
  socket.on('display_tokens3',function(data)
  {
    tokens[3] = data;
  });
  socket.on('display_tokens4',function(data)
  {
    tokens[4] = data;
  });
  socket.on('display_tokens5',function(data)
  {
    tokens[5] = data;
  });
});

http.listen(4000, function()
{
  console.log('listening on *:3000');
});
