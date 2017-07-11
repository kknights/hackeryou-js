$(function(){
  const map_wrapper = $('#map');
  var map;
  var infowindow;

  $('button').on('click', function(){
    map_wrapper.show();
  });
});


// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">


//TODO
// 1. onClick, get current location and store in a variable
// 2. update map with results
// 3. store initMap in name space function / app.initMap etc
// 4.


function initMap() {
  var toronto = {lat: 43.6422139, lng: -79.4253841};
  var currentLocation = navigator.geolocation.getCurrentPosition(
    function(position) {
      app.googleMaps.makeMap(position.coords);
      app.googleMaps.makeMarker(position.coords, 'You are here', '');
    },
    function(err){
      $('body').text('please enable location on your browser 🦄');
    });



    map = new google.maps.Map(document.getElementById('map'), {
      center: toronto,
      zoom: 16
    });

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: toronto,
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
  }
