var express = require('express');
var router = express.Router();
var models = require('../models/');
/* GET users listing. */
router.get('/:url_name', function(req, res) {
  var url_name = req.params.url_name;
  var page = models.Page;
  page.findOne({url_name: url_name}). then(function(doc){
    //console.log(doc);
    res.render('wiki', {doc: doc});
  });
});

module.exports = router;