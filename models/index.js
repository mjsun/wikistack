var mongoose = require('mongoose');
// Notice the `mongodb` protocol; Mongo is basically a kind of server,
// which handles database requests and sends responses. It's async!
mongoose.connect('mongodb://localhost/wikistack');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var pageSchema = new mongoose.Schema({
  title:    String,
  url_name: String,
  owner_id: String,
  content:  String,
  tags:     Array,
  date:     { type: Date, default: Date.now },
  status:   Number
});

pageSchema.virtual('full_route').get(function () {
  return '/wiki/'+this.url_name;
});

pageSchema.statics.findByTag = function(tagArr){
  return this.find({tags : {$in : tagArr}})
};

pageSchema.statics.findSimilar = function(id, callback){
  var self = this;
  this.findOne({_id: id}).then(function(doc){
    return self.find({$and : [{tags : {$in : doc.tags}},{_id : {$ne : id}}]});
  }).then(function(docs){
    callback(docs);
  })
};

var userSchema = new mongoose.Schema({
  name:  { first: String, last: String },
  email: String
});

var Page = mongoose.model('Page', pageSchema);
var User = mongoose.model('User', userSchema);

module.exports = {
  Page: Page,
  User: User
};