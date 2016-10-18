var _ = require('lodash');

var rootUrl = 'http://api.openweathermap.org/data/2.5/weather?APPID=379216e95ec398a22b3626392e157954';

// var kelvinToF = function(kelvin){
//   return Math.round((kelvin-273.15) * 1.8 + 32) + ' ˚F'
// }
var kelvinToC = function(kelvin){
  return Math.round(kelvin-273.15) + ' ˚C'
}




module.exports = function(latitude, longitude){
  //below is the version for ES6
  var url = `${rootUrl}&lat=${latitude}&lon=${longitude}`;
  //and below this is the old way, important to know both
  //rootUrl + '&lat=' + latitude + '&lon=' + longitude

  return fetch(url)
    .then(function(response){
      return response.json();
    })
    .catch((e) => console.log('Error with request', e))
    .then(function(json){
      return {
        city: json.name,
        temperature: kelvinToC(json.main.temp),
        description: _.capitalize(json.weather[0].description)
      }
    });
}
