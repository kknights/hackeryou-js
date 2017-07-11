$(function(){
  app.init();
});

const app = {};

app.googleMaps = function(){
  const map_wrapper = $('#map');

  // 1. Get current location onClick /  load map_wrapper
  $('button').on('click', function(){
    map_wrapper.show();

    // GET CURRENT POSITION
    navigator.geolocation.getCurrentPosition(
      function(position) {
        app.googleMaps.makeMap(position.coords);
        app.googleMaps.makeMarker(position.coords, 'You are here', '');
      },
      function(err){
        $('body').text('please enable location on your browser 🦄');
      });


    });

    // 2. Display a map showing present location / load nearby breweries
    app.googleMaps.makeMap = function(coords){
      var mapElement = $('#map')[0];
      var mapOptions = {
        center: {lat:coords.latitude, lng:coords.longitude},
        zoom: 16,
        styles: app.snazzyMap,
        scrollwheel: false,
        q: 'patios'
      };
      app.map = new google.maps.Map(mapElement, mapOptions);
    };


    // 3. Make a custom marker that has important info in it
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
  }






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



  };


  // const googleMapsApi = 'AIzaSyAkBAMLNjF6diO_3JoSbqO9vawVt0PbJgs';
