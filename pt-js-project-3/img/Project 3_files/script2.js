$(function(){
  app.init();
});

const app = {};
const map_wrapper = $('#map');

var currentLocation = '';
let longitude = '';
let latitude = '';


app.getCurrentLocation = function(){

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

    var currentLocation = {
      lat: latitude,
      lng: longitude
    };

  };

  console.log('currentLocation');

};




// // 3. display a map with breweries marked
function initMap() {

  var toronto = {
    lat: 43.6422139,
    lng: -79.4253841
  };

  map = new google.maps.Map(document.getElementById('map'), {
    center: toronto,
    zoom: 16
  });

  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: toronto ,
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
  app.getCurrentLocation();

  // $('button').on('click', function(){
  //   map_wrapper.show();
  //   app.getCurrentLocation();
  // });



};
