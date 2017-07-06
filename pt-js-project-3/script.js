var wanderlust = {};

wanderlust.apikey = 'AIzaSyDlD-Sy5NSz-uwNEcEJWfbEY4nRrTWARWU';


wanderlust.init = function() {
  wanderlust.getFlights();
};


wanderlust.getFlights = function(){
  $.ajax({
    url: 'https://www.googleapis.com/qpxExpress/v1/trips/search',
    type: 'POST',
    data: {
      key: wanderlust.apikey
    },


    // "request": {
    //   "passengers": {
    //     "kind": "qpxexpress#passengerCounts",
    //     "adultCount": 1
    //   },
    //   "slice": [
    //     {
    //       "kind": "qpxexpress#sliceInput",
    //       "origin": 'YYZ',
    //       "destination": 'BCN',
    //       "date": 2017-10-01,
    //
    //     }
    //   ],
    //
    // },


    // {
      "request":{
        "passengers":{
          "adultCount":1
        },
        "slice":[
          {
            "origin":"BOS",
            "destination":"LAX",
            "date":"2017-09-05"
          },
          {
            "origin":"LAX",
            "destination":"BOS",
            "date":"2017-09-10"
          }
        ]
      // }
    },
    success: function(){
      console.log("woot");
    }
  });
};



$(function(){
  wanderlust.init();
});
