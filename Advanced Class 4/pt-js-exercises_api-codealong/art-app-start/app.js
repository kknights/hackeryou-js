const artApp = {};

artApp.key = '7nGceDrA';

// method to fetch data
artApp.getData = (query) => {
 // create an ajax request to query the api for pictures of monkeys
 // we will need to provide our api key for the request
 $.ajax({
  url:'https://www.rijksmuseum.nl/api/en/collection',
  type: 'GET',
  data: {
    key: artApp.key,
    format: 'json',
    ps: 50,
    imgonly: true,
    q: query
  }
}).then((res) => artApp.displayArt(res.artObjects));
};


artApp.displayArt = (data) => {
  $('#artwork').empty();
  data.forEach(function(piece){
    const title = $('<h2>').text(piece.title);
    const artist = $('<p class="artist">').text(piece.principalOrFirstMaker);
    const image =  $('<img src="" alt="">').attr('src', piece.webImage.url);
    const imageContainer = $('<div>').addClass('piece').append(image, title, artist)
    $('#artwork').append(imageContainer);
  });
};


artApp.init = () => {
  artApp.getData('monkey');

  $('select#query').on('change', function(){
    const searchQuery = $(this).val();
    artApp.getData(searchQuery);

    $('#page-title').text(`Art with ${searchQuery}s`);
  })};


$(() => artApp.init());




