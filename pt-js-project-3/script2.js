//TODO: GET DIRECTIONS
//TODO: SLIDE DOWN TO #MAP
//TODO: STYLE REVIEWS
//TODO: namespacing

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
const $map = $('#map');

let currentLocation,
longitude,
latitude,
place,
placeName,
placeAddress,
placeRating,
placeReviews,
placePhotos,
placeID;

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

    $('.script').after('<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAndmRkziZDCACOh54MYbX-yqcLNjioLhc&libraries=places&callback=initMap" async defer></script><script src="https://maps.googleapis.com/maps/api/directions/json?callback=getDirections"></script>');
  };

  app.getLocation();
};



// 2. DISPLAY GOOGLE MAP SHOWING BREWERIES ETC
initMap = function(){
  map = new google.maps.Map(document.getElementById('map'), {
    center: currentLocation,
    zoom: 13,
    styles: app.snazzyMap
  });

  infowindow = new google.maps.InfoWindow();

  let breweries = new google.maps.places.PlacesService(map);

  breweries.nearbySearch({
    location: currentLocation ,
    radius: 5000,
    type: ['bar'],
    keyword: ['beer', 'brewery']
  }, callback);
};

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      app.createMarker(results[i]);
    }
  }
}


getDirections = function(){
  console.log('getDirections');
}
// 3. CREATE SEARCH RESULTS MARKERS AND INFOWINDOS
app.createMarker = function(place, icon){
  // search result markers
  let marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    reference: place.reference,
    icon: 'img/icon_breweries.png'
  });

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
        <p>Get directions</p>
        </div>`);

        infowindow.open(map, this);
        app.infoPanel();
        console.log(place.place_id);
      });
    };

    // GET REVIEWS
    app.getReviews = function(){
      let request = {
        placeId: placeID
      };

      service = new google.maps.places.PlacesService(map);
      service.getDetails(request, callback);

      function callback(place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {

          // let rating = document.querySelector('#rating');
          // let reviewEl = document.querySelector('.review-list');

          let rating = $('#rating');
          let reviewList = $('.review-list');

          reviewList.empty();

          rating.innerHTML = place.rating;

          for (let review of place.reviews){
            let li = document.createElement('li');
            li.innerHTML = `<div>Author: ${review.author_name}</div>
            <em>${review.text}</em>
            <div>Rating: ${review.rating} star(s)</div>`;
            reviewList.append(li);
          }
        }
      }
    };

    //INFOPANEL SIDEBAR THING
    app.infoPanel = function(){
      $('.placeName').on('click', function(){
        const breweryInfo = $('#brewery-info');
        $('.brewery-name').text(placeName);
        $('.brewery-address').text(placeAddress);
        $('.brewery-rating').text(placeRating);
        app.getReviews();

      });
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
    };







    //THIS WORKS, DO NOT DELETE
    // app.getBreweries = function(query){
    //   const brewerydbApi = 'b19fc49067f350df42af947a48da966e';
    //
    //   $.ajax({
    //     url: 'http://proxy.hackeryou.com',
    //     type: 'GET',
    //     dataType: 'json',
    //     data: {
    //       reqUrl: 'http://api.brewerydb.com/v2/breweries',
    //       params: {
    //         "key": brewerydbApi,
    //         "styleId": 1,
    //         "name": placeName
    //       },
    //       useCache: true,
    //       proxyHeaders: {
    //         'X-Something-Cool':'whoooooa'
    //       }
    //     }
    //   }).then(function(res) {
    //     console.log(res);
    //   });
    // };
