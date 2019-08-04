var subscriber = require("./Subscriber.js");
var ingester = require("./IngestData.js");
var http = require("http");

http.createServer(function (req, res) {
  
  res.setHeader('Content-Type', 'text/html; charset=UTF-8');
  res.writeHead(200);
  
  setInterval(function(){ 
    // msg = subscriber.subscribe();
    var msg = null;
    var objMsg = subscriber.subscribe();

    if(objMsg && objMsg.MsgData){
      msg = ingester.ingestStreamingData(objMsg);
    }

    if(msg){
      res.write(msg + '<br/>');
    }
    
  }, 2000);

}).listen(8082);

console.log('Server running at http://127.0.0.1:8082/');