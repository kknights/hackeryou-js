artApp = {};

artApp.apikey = "LTRodYi7";

artApp.init = function(){
  artApp.getPieces();
};

artApp.getPieces = function(){
  $.ajax({
    url: 'https://www.rijksmuseum.nl/api/en/collection',
    type: 'GET',
    data: {
      key: artApp.apikey,
      format: 'jsonp',
      q: 'monkey'
    },
    dataType: 'jsonp',
    success: function(result){
      artApp.displayPieces(result.artObjects);
    }
  });
};

artApp.displayPieces = function(data){
  $.each(data, function(i, piece){
    var title = $('<h2>').text(piece.title);
    var artist = $('<p>').addClass('artist').text(piece.principalOrFirstMaker);
    var image = $('<img>').attr('src', piece.webImage.url);
    var artPiece = $('<div>').addClass('piece').append(image, title, artist);
    $('#artwork').append(artPiece);
  });
};


$(function(){
  artApp.init();
});