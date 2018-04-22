// dependency
var mongoose = require("mongoose");

// schema constructor
var Schema = mongoose.Schema;

// create new schema for the articles
var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  summary: {
    type: String
  },
  picture: {
    type: String
  },
  saved: {
    type: Boolean,
    default: true
  },
  // reference for attached comments
  comment: {
    type: Schema.Types.ObjectId,
    ref: "Remark"
  }
});

// create a model from the schema
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;