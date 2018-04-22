$(document).ready(function(){
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
      console.log(result);
      location.reload();
    }).fail(function(xhr, responseText, responseStatus){
      if (xhr){
        console.log(xhr.responseText);
      };
    });
  });
});