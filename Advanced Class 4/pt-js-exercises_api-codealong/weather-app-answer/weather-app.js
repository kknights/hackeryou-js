var weatherWidget = {
  weatherData: {},

  init: function(){
    $.ajax('http://api.wunderground.com/api/61f0a55cb00602dc/conditions/q/CA/San_Francisco.json', {
      type: 'GET',
      dataType: 'jsonp',
      success: weatherWidget.parseData
    });
  },

  parseData: function(responseData){
    var tempData = responseData.current_observation;
    weatherWidget.weatherData.temp_c = tempData.temp_c;
    weatherWidget.weatherData.city = tempData.display_location.city;
    weatherWidget.weatherData.url = tempData.forecast_url;
    weatherWidget.weatherData.date = tempData.observation_time_rfc822;
    weatherWidget.weatherData.string = tempData.weather;
    weatherWidget.weatherData.image_url = tempData.icon_url;

    weatherWidget.updateDOM();
  },

  updateDOM: function(){
    $('.weather_image').attr('src', weatherWidget.weatherData.image_url);
    $('.weather_string').text(weatherWidget.weatherData.string);
    $('.temp_c').text(weatherWidget.weatherData.temp_c);
    $('.city_name').text(weatherWidget.weatherData.city);
    $('.date_time').text(weatherWidget.weatherData.date);
    $('a').attr('href', weatherWidget.weatherData.url);
  }
};

$(document).ready(function(){
  weatherWidget.init();
});