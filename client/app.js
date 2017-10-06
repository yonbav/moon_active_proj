var express = require('express'),
  http = require('http'),
  jade = require('jade'),
  index = require('./router/index'),
  bodyParser = require('body-parser')

var app = express()

// Setting the views to work with jade
app.set('views', './views')
app.set('view engine', 'jade')
app.engine('jade', require('jade').__express)

// Setting the body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// Setting the aplication locals
app.locals = {
  title: 'moon_active_proj'
}

// Setting the public dir
app.use(express.static(__dirname + '/'))

// declaring the router
app.use('/', index)

// starting the server
var server = app.listen(8080, function() {
  console.log('App is listening on port %s...', server.address().port)
})
