var extend = require('util')._extend;

const Pubsub = require('@google-cloud/pubsub');
const subscriptionName = 'SensorDataSubscription';
const projectId = 'horizontal-time-237307'; //'lucky-wall-233606';

const pubsub = Pubsub({
    projectId: projectId,
    keyFilename: 'horizontal-time-237307-0d32086dde7a.json' //'lucky-wall-233606-931ddbfa7309.json'
});

var objMsg = {};

var subscribe = function(){
    
    const subscription = pubsub.subscription(subscriptionName);

    // Create an event handler to handle messages
    const messageHandler = message => {
        objMsg = {MsgId:JSON.stringify(message.id), MsgData:message.data.toString(), MsgAttr:JSON.stringify(message.attributes)};
        // "Ack" (acknowledge receipt of) the message
        message.ack();
    };

    // Listen for new messages until timeout is hit
    subscription.on(`message`, messageHandler);

    setTimeout(() => {
        subscription.removeListener('message', messageHandler);
        //console.log(`${messageCount} message(s) received.`);
    }, 3000);

    if(objMsg && objMsg.MsgData){
        //Do a shallow copy and then set the actual message object to null
        var objMsgShallow = extend({}, objMsg);
        objMsg = null;
        return objMsgShallow;
    }
    else{
        return null;
    }
}

module.exports = {
    subscribe
};