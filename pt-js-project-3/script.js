var wanderlust = {};

wanderlust.apikey = 'AIzaSyDlD-Sy5NSz-uwNEcEJWfbEY4nRrTWARWU';


wanderlust.init = function() {
  wanderlust.getFlights();
  // console.log(wanderlust.getFlights);
};


wanderlust.getFlights = function(){
  $.ajax({
    url: 'https://www.googleapis.com/qpxExpress/v1/trips/search',
    type: 'POST',
    data: {
      key: wanderlust.apikey,
      dataType: 'application/json',
    },
    'request': {
      'slice': [
        {
          'origin': 'BOS',
          'destination': 'YYZ',
          'date': '2017-10-01'
        }
      ],
      'passengers': {
        'adultCount': 1,
        'infantInLapCount': 0,
        'infantInSeatCount': 0,
        'childCount': 0,
        'seniorCount': 0
      },
      'solutions': 20,
      'refundable': false
    },
    success: function(){
      console.log("woot");
    }
  });
};



$(function(){
  wanderlust.init();
});
