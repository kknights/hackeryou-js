var app = {};
app.apiKey = 'AIzaSyAndmRkziZDCACOh54MYbX-yqcLNjioLhc';

// app.earlyBird = {
//   latitude: 43.6425701,
//   longitude: -79.4222752
// }
//
// app.cnTower = {
//   latitude: 43.6448627,
//   longitude: -79.3892455
// }
var mapElement = $('.map')[0];

app.makeMap = function(coords){
  var mapOptions = {
    center: {lat:coords.latitude, lng:coords.longitude},
    zoom: 16,
    styles: app.snazzyMap,
    scrollwheel: false,
    q: 'patios'
  };

  app.map = new google.maps.Map(mapElement, mapOptions);
};

app.makeMarker = function(coords, infoText, icon){
  var mapMarker = new google.maps.Marker({
    position: {lat:coords.latitude, lng: coords.longitude},
    map: app.map,
    icon: icon,
  });

  var infoWindow = new google.maps.InfoWindow();



  google.maps.event.addListener(mapMarker, 'click', function(){
    infoWindow.setContent(infoText);
    infoWindow.setPosition({lat:coords.latitude, lng: coords.longitude});
    infoWindow.open(app.map, mapMarker);

  });
};

app.snazzyMap = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "hue": "#ff4400"
      },
      {
        "saturation": -68
      },
      {
        "lightness": -4
      },
      {
        "gamma": 0.72
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon"
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry",
    "stylers": [
      {
        "hue": "#0077ff"
      },
      {
        "gamma": 3.1
      }
    ]
  },
  {
    "featureType": "water",
    "stylers": [
      {
        "hue": "#00ccff"
      },
      {
        "gamma": 0.44
      },
      {
        "saturation": -33
      }
    ]
  },
  {
    "featureType": "poi.park",
    "stylers": [
      {
        "hue": "#44ff00"
      },
      {
        "saturation": -23
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "hue": "#007fff"
      },
      {
        "gamma": 0.77
      },
      {
        "saturation": 65
      },
      {
        "lightness": 99
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "gamma": 0.11
      },
      {
        "weight": 5.6
      },
      {
        "saturation": 99
      },
      {
        "hue": "#0091ff"
      },
      {
        "lightness": -86
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "lightness": -48
      },
      {
        "hue": "#ff5e00"
      },
      {
        "gamma": 1.2
      },
      {
        "saturation": -23
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "saturation": -64
      },
      {
        "hue": "#ff9100"
      },
      {
        "lightness": 16
      },
      {
        "gamma": 0.47
      },
      {
        "weight": 2.7
      }
    ]
  }
];


$(function(){
  navigator.geolocation.getCurrentPosition(
    function(position) {
      app.makeMap(position.coords);
      app.makeMarker(position.coords, 'text', '');
      // app.makeMarker(app.earlyBird, 'coffee!', 'https://static1.bigstockphoto.com/9/6/1/small2/16952759.jpg');

    },
    function(err){
      $('body').text('please enable location on your browser 🦄');
    });
  });



  // This example requires the Places library. Include the libraries=places
  // parameter when you first load the API. For example:
  // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
  // var map;
  // var infowindow;
  //
  // function initMap() {
  //   var pyrmont = {lat: -33.867, lng: 151.195};
  //
  //   map = new google.maps.Map(document.getElementById('map'), {
  //     center: pyrmont,
  //     zoom: 15
  //   });
  //
  //   infowindow = new google.maps.InfoWindow();
  //   var service = new google.maps.places.PlacesService(map);
  //   service.nearbySearch({
  //     location: pyrmont,
  //     radius: 500,
  //     type: ['store']
  //   }, callback);
  // }
  //
  // function callback(results, status) {
  //   if (status === google.maps.places.PlacesServiceStatus.OK) {
  //     for (var i = 0; i < results.length; i++) {
  //       createMarker(results[i]);
  //     }
  //   }
  // }
  //
  // function createMarker(place) {
  //   var placeLoc = place.geometry.location;
  //   var marker = new google.maps.Marker({
  //     map: map,
  //     position: place.geometry.location
  //   });
  //
  //   google.maps.event.addListener(marker, 'click', function() {
  //     infowindow.setContent(place.name);
  //     infowindow.open(map, this);
  //   });
  // }
