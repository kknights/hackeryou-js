$(function(){
  starwars.init();
});

var starwars = {};


starwars.useTheForce = function(query){
  $.ajax({
    url: 'http://swapi.co/api/people/schema',
    type: 'GET',
    format: 'JSONP'
  }).then(function(data) {
    console.log(data);
  });

};


starwars.init = function() {
  starwars.useTheForce();
};
