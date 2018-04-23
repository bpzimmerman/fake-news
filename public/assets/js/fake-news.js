$(document).ready(function(){

  function createCommentsList(dataArray){
    dataArray.forEach(function(item){
      var displayDate = item.created.substr(0, 10);
      var newListItem = $("<li>")
      newListItem.attr("class", "list-group-item")
                 .text(`${displayDate}: ${item.body}`);
      $("#comment-list").append(newListItem);
    })
  }
  // save article button click
  $(document).on("click", ".save", function(event){
    var data = {
      title: $(this).attr("data-title"),
      link: $(this).attr("data-link"),
      summary: $(this).attr("data-summary"),
      picture: $(this).attr("data-picture")
    };
    $.ajax({
      method: "POST",
      url: "/savedarticles",
      data: data
    }).done(function(result){
      location.reload();
    }).fail(function(xhr, responseText, responseStatus){
      if (xhr){
        console.log(xhr.responseText);
      };
    });
  });

  // delete article button click
  $(document).on("click", ".delete", function(event){
    var data = {
      id: $(this).attr("data-id")
    };
    $.ajax({
      method: "DELETE",
      url: "/savedarticles",
      data: data
    }).done(function(result){
      location.reload();
    }).fail(function(xhr, responseText, responseStatus){
      if (xhr){
        console.log(xhr.responseText);
      };
    });
  });

  // comments button click
  $(document).on("click", ".note", function(event){
    $("#comment-title").empty();
    $("#comment-list").empty();
    var articleId = $(this).attr("data-id");
    var title = `Article ${articleId} Comments`;
    $("#comment-title").attr("data-id", articleId);
    $("#comment-title").text(title);
    $.ajax({
      method: "GET",
      url: "/savednotes",
      data: {articleId: articleId}
    }).then(function(data) {
      console.log(data);
      if (data.length === 0){
        $("#comment-list").append('<li class="list-group-item">No comments for this article yet.</li>')
      } else {
        createCommentsList(data);
      }
    });
  });

  $(document).on("click", "#save-comment", function(event){
    event.preventDefault();
    var articleId = $("#comment-title").attr("data-id");
    var newComment = $("#comment-text").val().trim();
    $("#comment-text").val("");
    var commentData = {
      body: newComment,
      article: articleId
    };
    if (newComment != "" && newComment != null){
      $.ajax({
        method: "POST",
        url: "/savednotes",
        data: commentData
      }).then(function(data) {
        console.log(data);
      });
    };
  })
});