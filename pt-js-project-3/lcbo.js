$(function(){
  app.init();
});

var app = {};
var accessKey = 'MDo0ZDEyODQ2OC02MWViLTExZTctOGI3My1jYmE0NzY5MjgxZGI6bWJ0bkV2ZGFzQlRIYmExQzRBajM5TWRWeUF1MDAzeERGUFpV';

app.getWines = function(query){
  jQuery.ajax({
    url: 'https://lcboapi.com/products',
    headers: { 'Authorization': `Token ${accessKey}`},
    type: 'GET',
    q: 'wine'
  }).then(function(data) {
    console.log(data);
  });

};


app.init = function() {
  app.getWines();
};
