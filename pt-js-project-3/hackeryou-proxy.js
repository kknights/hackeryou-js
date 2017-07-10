$.ajax({
  url: 'http://proxy.hackeryou.com',
  dataType: 'json',
  method:'GET',
  data: {
    reqUrl: 'http://api.brewerydb.com/v2/?b19fc49067f350df42af947a48da966e',
    params: {
      GET: '/brewery/random'
    },
    xmlToJSON: false
  }
}).then(function(res) {
  console.log(res);
});
