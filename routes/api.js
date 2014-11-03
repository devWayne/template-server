var express = require('express');
var router = express.Router();

/* GET api listing. */
router.post('/', function(req, res) {
  res.send('respond with a resource');
});

module.exports = router;
