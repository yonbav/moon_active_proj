var express = require('express')
  , router = express.Router()
  , messageController = require('../controllers/messageController.js')

// making a post request to send the message
router.post('/', function(req, res, next) {
  messageController.echoMessage(req, res, next)
})
router.get('/', function(req, res, next) {
  res.render('main', {})
})
module.exports = router;
