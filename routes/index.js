var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    sourceCodeUrl : 'https://github.com/shippableSamples/sample_node_ddc',
    serviceName : 'Docker Datacenter'
  });
});

module.exports = router;
