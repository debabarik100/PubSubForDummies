const Pubsub = require('@google-cloud/pubsub');
const topicName = 'SensorData';
const projectId = 'horizontal-time-237307'; //'lucky-wall-233606';

const pubsub = Pubsub({
    projectId: projectId,
    keyFilename: 'horizontal-time-237307-0d32086dde7a.json' //'lucky-wall-233606-931ddbfa7309.json'
});

function getTopic (cb) {
    pubsub.createTopic(topicName, (err, topic) => {
      // topic already exists.
      if (err && err.code === 6) {
        cb(null, pubsub.topic(topicName));
        return;
      }
      cb(err, topic);
    });
  }

var PublishData = function() {
    // console.log('Button clicked.');
    // Pick a sensor randomly out of 10 sensors as the source sending the data
    var sensor = Math.floor(Math.random() * 11);
  
    // Get current time
    var date = new Date();
    var timestamp = date.getTime();
     
    // Send the message to Pub/Sub
    var msg = 'Sensor ID: ' + sensor.toString() + '   Hello World ' + timestamp.toString();
    console.log(msg); 

    getTopic((err, topic) => {
               
        if (err) {
          console.log('Error occurred while getting pubsub topic', err);
          return;
        }
  
        const publisher = topic.publisher();
        publisher.publish(Buffer.from(msg), (err) => {
            if (err) {
                console.log('Error occurred while queuing background task', err);
            } else {
                console.log(`Message ${msg} queued for background processing`);
            }
        });
    });
};

module.exports = {
    PublishData
};