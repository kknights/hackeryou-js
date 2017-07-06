$(function(){
  app.init();
});


var app = {};
var beerKey = '56479ba566f7d931c3aa2fb90cf29095';

app.getBeer = function(query){
  $.ajax({
    url: 'http://api.brewerydb.com/v2/beers',
    type: 'GET',
    format: 'JSON',
    key: beerKey
  });
  console.log(query);
};



app.init = function(){
  // console.log("loaded");
  app.getBeer();
}
