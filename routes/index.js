var express = require('express');
var router = express.Router();
var models = require('../models/');
/* GET home page. */

router.get('/', function(req, res, next) {
  var page = models.Page;
  page.find().then(function(docs){
  	res.render('index', { docs: docs});
  });
});

module.exports = router;
