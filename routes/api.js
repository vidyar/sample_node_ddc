var express = require('express');
var router = express.Router();
var add = require('../logic/add.js');

/* GET home page. */
router.get('/add', function(req, res, next) {
  return res.json(
    add(req.query.a, req.query.b)
  );
});

module.exports = router;
