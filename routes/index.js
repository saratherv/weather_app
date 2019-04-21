var express = require('express');
var router = express.Router();
var requestify = require('requestify');
/* GET home page. */

router.get('/', function(req, res) {
res.render('page')
});

function create_json(data){
    var jsn = {}

for(let i = 0 ; i< (data['forecast']["forecastday"]).length ; i++){
   jsn['day' + i] = {}
   jsn['day' + i]['date'] = data['forecast']['forecastday'][i]['date']
   jsn['day' + i]['temperature'] = data['forecast']["forecastday"][i]['day']['avgtemp_c']
   jsn['day' + i]['precipitation'] = data['forecast']['forecastday'][i]['day']['totalprecip_mm']
   jsn['day' + i]['humidity'] = data['forecast']['forecastday'][i]['day']['avghumidity']
}

return jsn
}

router.get('/data' , function(req , res) {
    let city = req.param('par')
    city = city.toLowerCase()
    url = 'http://api.apixu.com/v1/forecast.json?key=127fa96a7deb4d7993462146191904&q='+city+'&days=5'
    requestify.get(url)
     .then(function(response) {
      // Get the response body (JSON parsed or jQuery object for XMLs)
     console.log(response.getBody());
     resp = response.getBody();
     response_send = create_json(resp)
     res.send(response_send)
      }
     );
    
    
})





module.exports = router;
