var db = require("../models");
var cheerio = require("cheerio");
var request = require("request");

module.exports = function(app) {
  
  app.get("/newarticles", function(req, res) {
    // request call to grab the HTML body 
    request("https://www.theonion.com/", function(error, response, html) {

      // Load the HTML into cheerio and save it to a variable
      var $ = cheerio.load(html);

      // empty object containing an array to save the scraped data
      var data = {
        articles: []
      };

      // select the information scraped from the web page
      $(".js_post_item").each(function(i, element) {

        var link = $(element).children("header").children("h1").children("a").attr("href");
        var title = $(element).children("header").children("h1").children("a").text();
        var summary = $(element).children(".js_item-content").children(".entry-summary").children("p").text();
        var picture = $(element).children(".js_item-content").children("figure").children("a").children(".img-wrapper").children("picture").children("source").attr("data-srcset");

        db.Article.find({
          title: title
        }, function (err, result){
          if (err) {
            res.send(500);
            console.log(err);
          } else {
            if (result.length === 0){
              // if that article is not saved, push to the articles array in the data object
              data.articles.push({
                title: title,
                link: link,
                summary: summary,
                picture: picture,
                saved: false
              });
          };
          };
        });

      });

      // render the page using the scraped data
      res.render("index", data);
    });
  });

  app.get("/checksaved", function(req, res) {
    db.Article.find({
      title: req.query.title
    }, function (err, data){
      if (err){
        res.send(500);
        console.log(err);
      } else {
        res.json(data);
      };
    });
  });

  app.get("/savedarticles", function(req, res) {
    db.Article.find({
    }, function(err, data){
      if (err){
        res.send(500);
        console.log(err);
      } else {
        res.render("index", {articles: data});
      };
    });
  });

  app.post("/savedarticles", function(req, res) {
    db.Article.create({
      title: req.body.title,
      link: req.body.link,
      summary: req.body.summary,
      picture: req.body.picture
    }).then(function(dbArticle){
      res.json(dbArticle);
    }).catch(function(err){
      res.json(err);
    });
  });

  app.delete("/savedarticles", function(req, res) {
    db.Article.remove({
      _id: req.body.id
    }, function(err, data){
      if (err) {
        res.send(500);
        console.log(err);
      } else {
        res.json(data);
      };
    });
  });

};