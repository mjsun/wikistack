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

router.get('/tag/:tag', function(req, res) {
  var tag = req.params.tag;
  var page = models.Page;
  page.findByTag([tag]).then(function(docs){
  	res.render('index', { docs: docs});
  });
});


router.get('/similar/:id', function(req, res) {
  var id = req.params.id;
  var page = models.Page;
  page.findSimilar(id, function(docs){
  	res.render('index', { docs: docs});
  });
});

router.get('/delete/:id', function(req, res) {
  var id = req.params.id;
  var page = models.Page;
  page.remove({_id: id}).then(function(docs){
    return page.find();
  }).then(function(docs){
    res.render('index', { docs: docs});
  });
});

module.exports = router;
