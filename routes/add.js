var express = require('express');
var router = express.Router();
var models = require('../models/');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('add_page');
});

router.post('/submit', function(req, res){
    var title = req.body['page-title'];
    var content = req.body['page-content'];
    var tags = req.body['page-tags'].replace(/ /g, '').split(',');
    var url_name = title.replace(/ /g,'_');
    var page = new models.Page({ 'title': title, 'content': content, 'url_name': url_name, 'tags': tags });
    page.save();
	  res.redirect('/');
});


module.exports = router;
