$(function(){
  // app.init();
  const app = {};
  const brewerydbApi = 'b19fc49067f350df42af947a48da966e';
  const googleMapsApi = 'AIzaSyAkBAMLNjF6diO_3JoSbqO9vawVt0PbJgs';

  function initialize() {
    var pyrmont = new google.maps.LatLng(-33.8665, 151.1956);

    var map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 15,
      scrollwheel: false
    });

    // Specify location, radius and place types for your Places API search.
    var request = {
      location: pyrmont,
      radius: '500',
      types: ['store']
    };

    // Create the PlaceService and send the request.
    // Handle the callback with an anonymous function.
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, function(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          var place = results[i];
          // If the request succeeds, draw the place location on
          // the map as a marker, and register an event to handle a
          // click on the marker.
          var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
          });
        }
      }
    });
  }

  // Run the initialize function when the window has finished loading.
  google.maps.event.addDomListener(window, 'load', initialize);


});




// app.getBreweries = function(query){
//
//   $.ajax({
//   		url: 'http://proxy.hackeryou.com',
//   		type: 'GET',
//   		dataType: 'json',
//   		data: {
//   			reqUrl: 'http://api.brewerydb.com/v2/breweries',
//   			params: [
//           {
//   				"key" : brewerydbApi,
//   				"styleId" :1,
//           "status" : "success",
//           "numberOfPages" : 1,
//           "established" : "",
//           "data": {
//             name : "'t Hofbrouwerijke"
//           }
//         }
//         ]
//
//
//           // "hasImages": "Y"
//   			},
//   			useCache: true,
//   			proxyHeaders: {
//   				'X-Something-Cool':'whoooooa'
//   			}
//   		}
//   	}).then(function(res) {
//   		console.log(res);
//   	},console.log);
//
//
//   // $.ajax({
//   //   url: 'http://proxy.hackeryou.com',
//   //   dataType: 'json',
//   //   method:'GET',
//   //   data: {
//   //     reqUrl: 'http://api.brewerydb.com/v2/?b19fc49067f350df42af947a48da966e',
//   //     params: {
//   //       GET: '/brewery/random'
//   //     },
//   //     xmlToJSON: false
//   //   }
//   // }).then(function(res) {
//   //   console.log(res);
//   // });
//
// };


// app.init = function() {
//   // app.getBreweries();
//
//
//
//
//
//
//
//
// };
