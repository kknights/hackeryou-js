$(function(){
  app.init();
});


const app = {};
// const googleMapsApi = 'AIzaSyAkBAMLNjF6diO_3JoSbqO9vawVt0PbJgs';

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
  		console.log(res);
  	},console.log);
}





app.init = function() {
  app.getBreweries();
};
