let cm = require("cloudmine");
let rest = require("restler");

let ws = new cm.WebService({
  "appid":"993ef8942865413b92619b6a31d6c94b",
  "apikey":"3369b2c327c74a6986d97434142e8648"
});

module.exports = function(req, reply){

let input = req.payload.request.body;
//grabbing information off of the local app for routing purposes

ws.get('').on('success', function(data, response){

  let fitbit_appid = data.route_definitions.fitbit.appid;
  let fitbit_apikey = data.route_definitions.fitbit.apikey;
  let nokia_appid = data.route_definitions.nokia.appid;
  let nokia_apikey = data.route_definitions.nokia.apikey;

//grabbing information to make decisions

let _activity = input.activity;
let _device = input.source;
let _measure = input.measurement;

let vals = {"activity":_activity, 
            "measure":_measure};

switch(_device) {
  
    case "fitbit":
    let headers_fitbit = {"X-CloudMine-Apikey":fitbit_apikey};
    rest.postJson('https://api.secure.cloudmine.io/v1/app/' + fitbit_appid + '/run/stats',
    	vals,
    	{headers:headers_fitbit})
    .on('complete',function(stats, response) {
      let s = stats.result;
       reply(s);
    	});
        break;

    case "nokia":
       let headers_nokia = {"X-CloudMine-Apikey":nokia_apikey};
    rest.postJson('https://api.secure.cloudmine.io/v1/app/' + nokia_appid + '/run/stats',
    	vals,
    	{headers:headers_nokia})
    .on('complete',function(stats, response) {
      let s = stats.result;
       reply(s);
    	});
        break;

    default:
        reply({"error":"device not found"});
 	}
  });
};