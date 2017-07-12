$(function(){

  $('button').on('click', function(){
    getLocation()
  });
})


var longitude = '';
var latitude = '';

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
};

function showPosition(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.latitude;

  console.log(`${longitude}, ${latitude}`);
};
