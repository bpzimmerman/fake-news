// dependency
var mongoose = require("mongoose");

// schema constructor
var Schema = mongoose.Schema;

// create new schema for the notes
var CommentSchema = new Schema({
  title: {
    type: String
  },
  body: {
    type: String
  }
});

// create a model from the schema
var Remark = mongoose.model("Remark", CommentSchema);

// Export the Article model
module.exports = Remark;