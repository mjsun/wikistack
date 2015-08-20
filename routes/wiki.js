var express = require('express');
var router = express.Router();
var models = require('../models/');
/* GET users listing. */

// router.get('/:url_name', function(req, res) {
//   var url_name = req.params.url_name;
//   var page = models.Page;
//   page.findOne({url_name: url_name}). then(function(doc){
//     console.log(doc);
//     res.render('wiki', {doc: doc});
//   });
// });//this need to be modified to show multiple record

router.get('/:id', function(req, res) {
  var id = req.params.id;
  var page = models.Page;
  page.findOne({_id: id}). then(function(doc){
    res.render('wiki', {doc: doc});
  });
});//this need to be modified to show multiple record

// router.get('/edit/:url_name', function(req, res){
// 	var url_name = req.params.url_name;
//     var page = models.Page;
//     page.findOne({url_name: url_name}).then(function(doc){
//     	res.render('edit_wiki', {doc: doc});
//     });
// });

router.get('/edit/:id', function(req, res){
  var id = req.params.id;
  var page = models.Page;
  console.log(id);
  page.findOne({_id: id}).then(function(doc){
    res.render('edit_wiki', {doc: doc});
  });
});


// router.post('/edit/:url_name', function(req, res){
//     var previous_url = req.params.url_name;
//     var title = req.body['page-title'];
//     var content = req.body['page-content'];
//     var tags = req.body['page-tags'].replace(/ /g, '').split(',');
//     var url_name = title.replace(/ /g,'_');
//     var page = models.Page;
//     page.findOne({url_name: previous_url})
//       .then(function(doc){
//           doc.title = title;
//           doc.content = content;
//           doc.url_name = url_name;
//           doc.tags = tags;
//           return page.update({_id: doc._id}, doc);
//       })
//       .then(function(doc){
//         console.log('2',doc);
//         res.redirect('/wiki/'+url_name);
//       });
//     //when doing update, some time it does validate object
  
// });


router.post('/edit/:id', function(req, res){
    var id       = req.params.id;
    var title    = req.body['page-title'];
    var content  = req.body['page-content'];
    var tags     = req.body['page-tags'].replace(/ /g, '').split(',');
    var url_name = title.replace(/ /g,'_');
    var page     = models.Page;
    page.findOne({_id: id})
      .then(function(doc){
          doc.title = title;
          doc.content = content;
          doc.url_name = url_name;
          doc.tags = tags;
          return page.update({_id: id}, doc);
      })
      .then(function(doc){
        res.redirect('/wiki/'+ id);
      });  
});

module.exports = router;