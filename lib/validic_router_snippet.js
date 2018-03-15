let cm = require("cloudmine");
let rest = require("restler");

let ws = new cm.WebService({
  "appid":"993ef8942865413b92619b6a31d6c94b",
  "apikey":"3369b2c327c74a6986d97434142e8648"
});

module.exports = function(req, reply){

let input = req.payload.request.body
let category = input.activity_category;
let sourceDevice = input.source;

ws.get('').on('success', function(data, response){

  let fitbit_appid = data.route_definitions.fitbit.appid;
  let fitbit_apikey = data.route_definitions.fitbit.apikey;
  let nokia_appid = data.route_definitions.nokia.appid;
  let nokia_apikey = data.route_definitions.nokia.apikey;
  
  let fitbit_msg = {"fitbit app id"    : fitbit_appid,
   		            "fitbit api key"   :   fitbit_apikey,
                    "activity category": category,
                    "device"           : sourceDevice};

  let nokia_msg = {"nokia app id"     :  nokia_appid,
                   "nokia api key"    :  nokia_apikey,
                   "activity category":  category,
                   "device"           :  sourceDevice};

switch(sourceDevice) {
  
    case "fitbit":
    let headers_fitbit = {"X-CloudMine-Apikey":fitbit_apikey};
    rest.postJson('https://api.secure.cloudmine.io/v1/app/' + fitbit_appid + '/run/fitbit',
    	input,
    	{headers:headers_fitbit})
    .on('complete',function(info, response) {
       reply({"results":"successfully posted to fitbit application",
   	         "sent":input});
    	});
        break;


    case "nokia":
       let headers_nokia = {"X-CloudMine-Apikey":nokia_apikey};
    rest.postJson('https://api.secure.cloudmine.io/v1/app/' + nokia_appid + '/run/nokia',
    	input,
    	{headers:headers_nokia})
    .on('complete',function(info, response) {
       reply({"results":"successfully posted to nokia application",
   	         "sent":input});
    	});
        break;

    default:
        reply({"error":"device not found"});
	 }  
 });
};
