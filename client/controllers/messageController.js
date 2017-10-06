var http = require('http')
  , queryString = require('query-string');

const PORT = '3000';
const HOST_NAME = 'localhost';

// save a message
exports.echoMessage = function(req, res, next) {
  // anitialize the publish date info
  var dateTime = new Date(req.body.date)
  dateTime.setHours(parseInt(req.body.time.substring(0,2)))
  dateTime.setMinutes(parseInt(req.body.time.substring(3,5)))

  // initialize the message to pass
  var message = {content: req.body.content, date: dateTime.getTime()}

  // Creating the data to pass
  var data = queryString.stringify(message)

  // setting the options
  var options = {
    hostname: HOST_NAME,
    port: PORT,
    path: '/echoAtTime',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(data)
    }
  }

  //  sending a post message to the server
  var request = http.request(options, function(response) {
    response.setEncoding('utf8')
    res.redirect('/')
  })

  // sets function when an error eccures
  request.on('error', function(err) {
    res.render('error', {error: err.toString()})
  })

  // sets function when an timeout eccures
  request.on('timeout', function() {
    res.render('error', {error: '::timeout::'})
  })

  request.setTimeout(50000)
  request.write(data)
  request.end();
}
