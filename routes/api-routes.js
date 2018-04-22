var db = require("../models");
var cheerio = require("cheerio");
var request = require("request");

module.exports = function(app) {
  
  app.get("/newarticles", function(req, res) {
    // request call to grab the HTML body 
    request("https://www.theonion.com/", function(error, response, html) {

      // Load the HTML into cheerio and save it to a variable
      var $ = cheerio.load(html);

      // An empty array to save the data that we'll scrape
      var data = {
        articles: []
      };

      // select the information scraped from the web page
      $(".js_post_item").each(function(i, element) {

        var link = $(element).children("header").children("h1").children("a").attr("href");
        var title = $(element).children("header").children("h1").children("a").text();
        var summary = $(element).children(".js_item-content").children(".entry-summary").children("p").text();
        var picture = $(element).children(".js_item-content").children("figure").children("a").children(".img-wrapper").children("picture").children("source").attr("data-srcset");

        // make an object from the scraped data and push it into the results array
        data.articles.push({
          title: title,
          link: link,
          summary: summary,
          picture: picture
        });
      });

      // Log the results once you've looped through each of the elements found with cheerio
      res.render("index", data);
      // res.send(data.articles);
    });
  });

  app.post("/api/articles", function(req, res) {

  });

  app.delete("/api/articles", function(req, res) {

  });

};