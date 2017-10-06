var express = require('express'),
  http = require('http'),
  index = require('./router/index'),
  bodyParser = require('body-parser')

var app = express()

// Setting the body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// Setting the public dir
app.use(express.static(__dirname + '/'))

// declaring the router
app.use('/', index)

// starting the server
var server = app.listen(3000, function() {
  console.log('Server is listening on port %s...', server.address().port)
})
