//TODO: SLIDE DOWN TO #MAP

//√ TODO: sticky footer
//√ TODO: GET DIRECTIONS
//√ TODO: STYLE REVIEWS
//√ TODO: GET REVIEWS AND/OR PHOTOS
//√ TODO: TIDY UP CODE FOR CONSISTENCY
//√ TODO: filter out coffeeshops
//√ TODO: ADD IN CURRENT LOCATION MARKER
//√ TODO: POPULATE INFO WINDOW
//√ TODO: ADD FANCY ANIMATION TO THE TITLE (SPINNING, ZOOM, ETC)
//√ TODO: SNAZZY MAPS

$(function(){
  app.init();
});

const app = {};
const map_wrapper = $('.map_wrapper');

let currentLocation,
    longitude,
    latitude,
    place,
    placeName,
    placeAddress,
    placeRating,
    placeReviews,
    placePhotos,
    placeID,
    getDirections;


// 0.  Page elements
app.buttonStuff = function(){
  let $button = $('button');

  $($button).on('click', function(){
    map_wrapper.show();
    app.getCurrentLocation();
  });

  $($button).hover(
    function(){
      $(this).toggleClass('animated pulse infinite');
    }
  );
}

app.titleEffects = function() {
  $('h1').on('click', function() {
    $(this).toggleClass('animated jackInTheBox');
  });
}


// 1. GET USER'S CURRENT LOCATION, THEN LOAD GOOGLE API SCRIPT
app.getCurrentLocation = function(){
  app.getLocation = function(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(app.coords);
    } else {
      console.log("Aww snap. Geolocation is not supported by this browser.");
    }
  };

  app.coords = function(position){
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    currentLocation = {
      lat: latitude,
      lng: longitude
    };

    $('.script').after('<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAndmRkziZDCACOh54MYbX-yqcLNjioLhc&libraries=places&callback=initMap" async defer></script>');
  };
  app.getLocation();
};


// 2. DISPLAY GOOGLE MAP SHOWING BREWERIES ETC
initMap = function(){

  infowindow = new google.maps.InfoWindow();

  map = new google.maps.Map(document.getElementById('map'), {
    center: currentLocation,
    zoom: 13,
    styles: app.snazzyMap
  });

  let breweries = new google.maps.places.PlacesService(map);
  let directionsService = new google.maps.DirectionsService;
  let directionsDisplay = new google.maps.DirectionsRenderer;

  breweries.nearbySearch({
    location: currentLocation ,
    radius: 5000,
    type: ['bar'],
    keyword: ['beer', 'brewery']
  }, app.callback);

  directionsDisplay.setMap(map);

  getDirections = function() {
    app.calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
}

// 3. show the route
app.calculateAndDisplayRoute = function(directionsService, directionsDisplay) {
  directionsService.route({
    origin: currentLocation,
    destination: placeAddress,
    travelMode: 'BICYCLING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
};


app.callback = function(results, status){
// function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      app.createMarker(results[i]);
    }
  }
}


// 3. CREATE SEARCH RESULTS MARKERS AND INFOWINDOW
app.createMarker = function(place, icon){

  // current location marker
  let currentMarker = new google.maps.Marker({
    map: map,
    position: currentLocation,
    reference: place.reference,
    icon: 'img/icon_current.png'
  });

  // current info window
  google.maps.event.addListener(currentMarker, 'click', function() {
    infowindow.setContent(
      `📌  &nbsp;You are here`);
      infowindow.open(map, this);
      app.infoPanel();
    });


    // search result markers
    let marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      reference: place.reference,
      icon: 'img/icon_breweries.png'
    });


    // search result info windows
    google.maps.event.addListener(marker, 'click', function() {
      placeName = place.name;
      placeAddress = place.vicinity;
      placeRating = place.rating;
      placePhotos = place.photos.getUrl; //doesnt work
      placeReviews = place.reviews;
      placeID = place.place_id;

      infowindow.setContent(
        `<div class="info-window">
        <a href="#${placeName}" class="placeName">🍺 ${placeName}</a>
        <p>${placeAddress}</p>
        <a href="#" class="show-route">Show route</a>
        </div>`);

        infowindow.open(map, this);
        app.infoPanel();
      });
    };

    // 5. GET REVIEWS
    app.getReviews = function(){
      let request = {
        placeId: placeID
      };

      service = new google.maps.places.PlacesService(map);
      service.getDetails(request, callback);

      function callback(place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {

          let rating = $('#rating');
          let reviewList = $('.review-list');

          reviewList.empty();

          rating.innerHTML = place.rating;

          for (let review of place.reviews){
            let li = document.createElement('li');
            li.innerHTML = `<div>Author: ${review.author_name}</div>
            <p>${review.text}</p>
            <small>Rating: ${review.rating} star(s)</small>`;
            reviewList.append(li);
          }
        }
      }
    };


    //INFOPANEL SIDEBAR THING
    app.infoPanel = function(){
      $('.placeName').on('click', function(){
        const breweryInfo = $('#brewery-info');
        breweryInfo.show();
        $('.brewery-name').text(placeName);
        $('.brewery-address').text(placeAddress);
        $('.brewery-rating').text(placeRating);
        app.getReviews();
      });

      $('.show-route').on('click', function(e){
        e.preventDefault();
        getDirections();
      })
    };

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
      app.buttonStuff();
      app.titleEffects();
    };
