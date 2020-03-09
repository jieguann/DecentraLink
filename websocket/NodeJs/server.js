var fs = require('fs');
const url = require('url');
// read ssl certificate
var privateKey = fs.readFileSync('ssl-cert/privkey.pem', 'utf8');
var certificate = fs.readFileSync('ssl-cert/fullchain.pem', 'utf8');

var credentials = { key: privateKey, cert: certificate };
var https = require('https');

//pass in your credentials to create an https server
var httpsServer = https.createServer(credentials);
httpsServer.listen(443);

var WebSocketServer = require('ws').Server;

var data=null;

//var wss1 = new WebSocketServer({server: httpsServer});

//var wss2 = new WebSocketServer({server: httpsServer});
var wss1 = new WebSocketServer({ noServer: true });
var wss2 = new WebSocketServer({ noServer: true });

wss1.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        data = message
        //console.log('received: %s', message);

        console.log(data)


        //ws.send('reply from server : ' + message)
    });

   // ws.send('something');
});

wss2.on('connection', function connection(ws) {
  // ...

  //ws.send(data);
if(data !== null){
  if(data == "0"){
    wss2.clients.forEach(function each(client) {
        if (client.readyState === require('ws').OPEN) {
          client.send("0");
          console.log("send 0")

        }
    });
  }

  else{
    wss2.clients.forEach(function each(client) {
        if (client.readyState === require('ws').OPEN) {
          client.send("1");
          console.log("send 1")

        }
    });
  }

  data = null;
}


else{
  wss2.clients.forEach(function each(client) {
      if (client.readyState === require('ws').OPEN) {
        client.send("nothing");
        console.log("send nothing")

      }
  });
}


ws.on('message', function incoming(message) {
    
    //console.log('received: %s', message);

    console.log(message)


    //ws.send('reply from server : ' + message)
});

});






//mutiple test
httpsServer.on('upgrade', function upgrade(request, socket, head) {
  const pathname = url.parse(request.url).pathname;

  if (pathname === '/received') {
    wss1.handleUpgrade(request, socket, head, function done(ws) {
      wss1.emit('connection', ws, request);
    });
  } else if (pathname === '/send') {
    wss2.handleUpgrade(request, socket, head, function done(ws) {
      wss2.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }
});
