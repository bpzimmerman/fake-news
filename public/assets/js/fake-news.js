$(document).ready(function(){

  // save article button click
  $(document).on("click", ".save", function(event){
    var data = {
      title: $(this).attr("data-title"),
      link: $(this).attr("data-link"),
      summary: $(this).attr("data-summary"),
      picture: $(this).attr("data-picture"),
      saved: true
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
    var title = `Article ${$(this).attr("data-id")} Comments`;
    $("#comment-title").text(title);
  });
});