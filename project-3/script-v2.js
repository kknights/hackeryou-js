$(function(){
  app.init();
});


var app = {};

var flickerKey = '595c01742ae275373aab21b815215446';
var flickerSecret = '90e6c7aee21848fc';


app.flickrSearch = function(query){

  $.ajax({
    url: 'https://api.flickr.com/services',
  }).then(function(data) {
    console.log(data);
  });

};





app.init = function(){
  app.flickrSearch();
}
