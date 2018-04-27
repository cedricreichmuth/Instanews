$(function() {
  $(".sectionDropdown").on("change", function() {
    $("header").css({"height": "auto", "border": "20px solid black"});
    if($(window).width() >= 600 && $(window).width() < 1000) {
      $(".logo").css("height", "70px");
      $(".logo-container").css({"width": "50%", "padding-right": "20px", "transition": "padding-right 0.5s linear 0.5s"});
      $(".form").css("width", "50%");
    } else if ($(window).width() > 1000) {
        $(".logo").css("height", "70px");
        $(".logo-container").css({"width": "10%", "justify-content": "flex-start", "padding-left": "20px", "transition": "padding-left 0.5s linear 0.5s"});
        $(".form").css("width", "90%");
    } else {}
    $(".container").empty();
    $(".container").append('<div class="loadingGifContainer"><img class="loadingGif" src="assets/images/ajax-loader.gif" alt="loading"></div>');
    var sections = $("select[name=selector]").val();
    var url = "https://api.nytimes.com/svc/topstories/v2/" + sections + ".json";
    url += '?' + $.param({
      'api-key': "81d1437f9857447fbec049a15de271d7"
    });
  $.ajax({
    url: url,
    method: 'GET',
  })
    .done(function(data) {
      $(".container").empty();
      $.each(data.results, function(key, value){
        if(value.multimedia.length >= 1) {
          var link = value.url;
          var img = value.multimedia[4].url;
          var abstract = value.abstract;
            $(".container").append('<div class="article" style="background-image: url(' + img + ')"><a href="' + link + '" target ="_blank"><p>' + abstract + '</p></a></div>')
        } else {
            $(".container").append('<div class="noImage" style="background-image: url(' + img + ')"><a href="' + link + '" target ="_blank"><p>' + abstract + '</p></a></div>')
            $(".noImage").css("display", "none");
        }
        return key < 11;
        });
      })
    }).fail(function() {
      alert("Loading error, you can not view the stories")
    });
  });
