var publisher = require('./Publisher.js')

var http = require("http"),
fs = require('fs');

fs.readFile('./index.html', function (err, html) {
    if (err) {
        throw err; 
    }       
    http.createServer(function(request, response) {
      if (request.method === 'POST') {
        var data = '';
    
        request.on('data', function(chunk) {
          data += chunk;
        });
    
        request.on('end', function() {
          //foo();
          publisher.PublishData();
        });
      }
      response.writeHeader(200, {"Content-Type": "text/html"});  
      response.write(html);  
      response.end();  
    }).listen(8081);
});

var foo = function() {
  // console.log('Button clicked.');
  // Pick a sensor randomly out of 10 sensors as the source sending the data
  var sensor = Math.floor(Math.random() * 11);

  // Get current time
  var date = new Date();
  var timestamp = date.getTime();
   
  // Send the message to Pub/Sub
  var msg = 'Sensor ID: ' + sensor.toString() + '   Hello World ' + timestamp.toString();
  console.log(msg); 
};

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');