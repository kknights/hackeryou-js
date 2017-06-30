artApp = {};

artApp.apikey = "vG85xsoa";
artApp.thumbSize = 500;

artApp.init = function(){
  artApp.getPieces('monkey');
  $('#animal-select').on("change", function(){
    var animal = $(this).val();
    var animalName = $(this).find(':selected').text();
    artApp.updateTitle(animalName);
    artApp.getPieces(animal);
  });
};

artApp.getPieces = function(query){
  $.ajax({
    url: 'https://www.rijksmuseum.nl/api/en/collection',
    type: 'GET',
    data: {
      key: artApp.apikey,
      format: 'jsonp',
      q: query
    },
    dataType: 'jsonp',
    success: function(result){
      $('#artwork').empty();
      artApp.displayPieces(result.artObjects);
    }
  });
};

artApp.displayPieces = function(data){
  $.each(data, function(i, piece){
    var image = $('<img>').attr('src', piece.webImage.url);
    var title = $('<h2>').text(piece.title);
    var artist = $('<p>').addClass('artist').text(piece.principalOrFirstMaker);
    var artPiece = $('<div>').addClass('piece').append(image, title, artist);
    $('#artwork').append(artPiece);
  });
};

artApp.updateTitle = function(subject){
  $("#page-title").find("span").text(subject);
};


$(function(){
  artApp.init();
});
