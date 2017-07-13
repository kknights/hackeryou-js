//TODO: ADD IN CURRENT LOCATION MARKER
//TODO: POPULATE INFO WINDOW
//TODO: GET DIRECTIONS
//TODO: GET WEATHER
//TODO: GET REVIEWS AND/OR PHOTOS
//TODO: ADD FANCY ANIMATION TO THE TITLE (SPINNING, ZOOM, ETC)
//TODO: SNAZZY MAPS

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


  map = new google.maps.Map(document.getElementById('map'), {
    center: currentLocation,
    zoom: 13,
    styles: app.snazzyMap

  });

  infowindow = new google.maps.InfoWindow();
  var breweries = new google.maps.places.PlacesService(map);
  breweries.nearbySearch({
    location: currentLocation ,
    radius: 5000,
    type: ['bar'],
    keyword: ['brewery']
  }, callback);

  // var bikeLayer = new google.maps.BicyclingLayer();
  // bikeLayer.setMap(map);
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


app.snazzyMap = [
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffe5ad"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffe5ad"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#5d3e3e"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffe5ad"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffe5ad"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffe5ad"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffe5ad"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#fef2dd"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.natural.landcover",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#fef2dd"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.natural.terrain",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#fef2dd"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.government",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.government",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.medical",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.medical",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#e7fed2"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.place_of_worship",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.place_of_worship",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.school",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.school",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.sports_complex",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.sports_complex",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#65b76b"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "hue": "#ff0000"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#3daed1"
            }
        ]
    }
];



app.init = function() {
  // app.getBreweries();

  // $('h1').addClass('animated jackInTheBox');

  $('button').on('click', function(){
    map_wrapper.show();
    app.getCurrentLocation();
  });



};
