$(function(){
  app.init();
});

const app = {};
const map_wrapper = $('#map');
let currentLocation ="";

// // 3. display a map with breweries marked
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


app.googleMaps = function(){

  // 1. GET CURRENT POSITION
  app.googleMaps.currentLocation = function(){
    navigator.geolocation.getCurrentPosition(
      function(position) {
        app.googleMaps.makeMap(position.coords);
        app.googleMaps.makeMarker(position.coords, 'You are here', '');
        currentLocation = position.coords;
        console.log(currentLocation);
      },
      function(err){
        $('body').text('please enable location on your browser 🦄');
      });
    };



    //3. Make a custom marker that has important info in it
    app.googleMaps.makeMarker = function(coords, infoText, icon){
      var mapMarker = new google.maps.Marker({
        position: {lat:coords.latitude, lng: coords.longitude},
        map: app.map,
        icon: icon,
      });

      var infoWindow = new google.maps.InfoWindow();

      google.maps.event.addListener(mapMarker, 'click', function(){
        infoWindow.setContent(infoText);
        infoWindow.setPosition({lat:coords.latitude, lng: coords.longitude});
        infoWindow.open(app.map,  mapMarker);
      });
    };
  };






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
    app.googleMaps();
    app.getBreweries();

    // 1. Get current location onClick /  load map_wrapper
    $('button').on('click', function(){
      map_wrapper.show();
      app.googleMaps.currentLocation();
      console.log(currentLocation);
    });



  };


  // const googleMapsApi = 'AIzaSyAkBAMLNjF6diO_3JoSbqO9vawVt0PbJgs';
