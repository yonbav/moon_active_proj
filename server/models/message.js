var redis = require('redis')
  , AsyncLock = require('async-lock')
  , lock = new AsyncLock()
  , subClient = redis.createClient('6379','127.0.0.1') //creates a new client to subscribe;
  , pubClient = redis.createClient('6379','127.0.0.1') //creates a new client to publish;

const CHANNEL = "moon_active_channel"
const ORDERED_SET_NAME = "unpublished"

// happens when an error occures
subClient.on("error", function (err) {
    console.log("Error: " + err);
});

// heppanes when an error occures
pubClient.on("error", function (err) {
    console.log("Error: " + err);
});

// subscribing the new user to the channel
subClient.on("connect", function(err) {
  // signing the subClient
  subClient.subscribe(CHANNEL);
  // printing to the console that we are good to go
  console.log()
  console.log("you are connected to ".concat(CHANNEL))
  console.log("========================================")
})

// declaring the behavior when gets a channel
subClient.on("message", function(channel, message) {
  // writing the message to the console
  console.log(message)
})

// saving a message
exports.echoAtTime = function(date, content) {
  // saving the message to the publishing waiting lists
  pubClient.zadd(ORDERED_SET_NAME, date.getTime(), date.toLocaleString().concat("-").concat(content))
}

// function to handle unpublished messages
var timingMessagesInterval = setInterval(function()
{
  // gets the first item in the ordered set
  pubClient.zrange(ORDERED_SET_NAME, 0, 0, 'withscores', function(err, firstItem){
    // Checks if an error has occured
    if(err){console.log(err.toString())}
    // Checks if there are items in the list
    else if(firstItem[1] < Date.now()){
      // cricital part has to be inside a lock
      lock.acquire('key', function() {
        //publishes the message
        pubClient.publish(CHANNEL, firstItem[0])
        // deleting the message from the set of waiting messages
        pubClient.zrem(ORDERED_SET_NAME, firstItem[0])
      })
    }
  })
}, 1000)

// closing the server
var closeServer = function() {
    sub.unsubscribe(new function() {
      console.log("sub is unsubscribed")
    });
    sub.quit(new function() {
      console.log("sub is disconnected")
    });
    pub.quit(new function() {
      console.log("pub is disconnected")
    });
    clearInterval(timingMessagesInterval, new function() {
      console.log("cleared the interval")
    });

    console.log("you are good to go...")
}
