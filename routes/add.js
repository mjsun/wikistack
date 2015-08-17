var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('add_page');
});

router.post('/submit', function(req, res){
	var models = require('../models/');
    var title = req.body['page-title'];
    var content = req.body['page-content'];
    var url_name = title.replace(/ /g,'_');
    console.log(url_name);
  // STUDENT ASSIGNMENT:
  // add definitions of the `title`, `content` and `url_name` variables here

    var page = new models.Page({ 'title': title, 'content': content, 'url_name': url_name });
    page.save();
	res.redirect('/');
});

module.exports = router;
