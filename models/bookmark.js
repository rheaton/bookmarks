var mongoose = require('mongoose')
   ,Schema = mongoose.Schema;

var schema = new Schema({
  url: String,
  name: String,
  created: {type: Date, default: Date.now}
});

var Bookmark = mongoose.model("Bookmark", schema);
exports.Bookmark = Bookmark;
