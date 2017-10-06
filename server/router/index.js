var express = require('express')
  , router = express.Router()
  , messageController = require('../controllers/messageController.js')

router.post('/echoAtTime', function(req, res){
  messageController.echoAtTime(req, res);
})

module.exports = router;
