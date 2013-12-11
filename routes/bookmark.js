var model = require('../models/bookmark');
var Bookmark = model.Bookmark;

exports.index = function(req, res){
  Bookmark.find(function(error, bookmarks, count) {
    res.render('bookmarks/index', {bookmarks: bookmarks, count: count});
  });
};

exports.new = function(req, res){
  res.render('bookmarks/new');
};

exports.create = function(req, res) {
  console.log(req.param('name'));
  new Bookmark({
    url: req.param('url'),
    name: req.param('name')
  }).save(function(error, bookmark, count) {
    console.log("new bookmark made!", bookmark);
    res.redirect('bookmarks');
  });
};
