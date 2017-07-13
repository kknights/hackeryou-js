$(function(){
  app.init();
});

const app = {};
const map_wrapper = $('#map');

let currentLocation = '';
let longitude = '';
let latitude = '';


app.getCurrentLocation = function(){
  console.log(`1. app.getCurrentLocation loaded`);

  app.getLocation = function(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(app.showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  app.showPosition = function(position){
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    currentLocation = {
      lat: latitude,
      lng: longitude
    };

    //this works!
    // console.log(currentLocation);
    // console.log(latitude);
    // console.log(longitude);
  };

  app.getLocation();

  setTimeout(function request() {
    console.log("set timeout for 5 sec");
    $('.script').after('<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAndmRkziZDCACOh54MYbX-yqcLNjioLhc&libraries=places&callback=initMap" async defer></script>')
  }, 5000);

};



// // 3. display a map with breweries marked
function initMap() {

  console.log(`2: initMap loaded`);
  console.log(`currentLocation: ${currentLocation.lat}`);
  console.log(`latitude: ${latitude}`);
  console.log(`longitude: ${longitude}`);


  var toronto = {
    lat: 43.6422139,
    lng: -79.4253841
  };

  map = new google.maps.Map(document.getElementById('map'), {
    center: currentLocation,
    zoom: 16
  });

  infowindow = new google.maps.InfoWindow();
  var patios = new google.maps.places.PlacesService(map);
  patios.nearbySearch({
    location: currentLocation ,
    radius: 500,
    // type: ['bar'],
    keyword: ['patio']
  }, callback);

  var bikeLayer = new google.maps.BicyclingLayer();
  bikeLayer.setMap(map);

}




function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
};




//3. Make a custom marker that has important info in it
// app.googleMaps.makeMarker = function(coords, infoText, icon){
//   var mapMarker = new google.maps.Marker({
//     position: {lat:coords.latitude, lng: coords.longitude},
//     map: app.map,
//     icon: icon,
//   });

// var infoWindow = new google.maps.InfoWindow();

// google.maps.event.addListener(mapMarker, 'click', function(){
//   infoWindow.setContent(infoText);
//   infoWindow.setPosition({lat:coords.latitude, lng: coords.longitude});
//   infoWindow.open(app.map,  mapMarker);
// });
//   };
// };






//THIS WORKS, DO NOT DELETE
app.getBreweries = function(query){
  const brewerydbApi = 'b19fc49067f350df42af947a48da966e';

  $.ajax({
    url: 'http://proxy.hackeryou.com',
    type: 'GET',
    dataType: 'json',
    data: {
      reqUrl: 'http://api.brewerydb.com/v2/beers',
      params: {
        "key" :brewerydbApi,
        "styleId" :1
      },
      useCache: true,
      proxyHeaders: {
        'X-Something-Cool':'whoooooa'
      }
    }
  }).then(function(res) {
    // console.log(res);
  },console.log);
}





app.init = function() {
  // app.getBreweries();

  $('button').on('click', function(){
    map_wrapper.show();
    app.getCurrentLocation();
  });



};
