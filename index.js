$(function() {
  $(".sectionDropdown").on("change", function() {
    var sections = $("select[name=selector]").val();
    var url = "https://api.nytimes.com/svc/topstories/v2/" + sections + ".json";
    url += '?' + $.param({
      'api-key': "81d1437f9857447fbec049a15de271d7"
    });
  $.ajax({
    url: url,
    method: 'GET',
  }).done(function(data) {
      $(".container").empty();
      $.each(data.results, function(key, value){
        if(value.multimedia.length >= 1) {
          var link = value.url;
          var img = value.multimedia[2].url;
          var abstract = value.abstract;
          $(".container").append('<a href="' + link + '" target ="_blank"><div><img src="' + img + '"><p>' + abstract + '</p></div></a>')
        } else {
          var link = value.url;
          var img = "assets/images/nyt-logo.svg";
          var abstract = value.abstract;
          $(".container").append('<a href="' + link + '" target ="_blank"><div><img src="' + img + '"><p>' + abstract + '</p></div></a>')
        }
      })
    }).fail(function(err) {
      throw err;
    });
  })
});
