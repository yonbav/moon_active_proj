var Message = require('../models/message.js')

exports.echoAtTime = function(req, res)
{
  Message.echoAtTime(new Date(parseInt(req.body.date)), req.body.content)

  // sending response to the user
  res.status(201)
  res.send()
}
