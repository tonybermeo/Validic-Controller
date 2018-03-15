let cm = require("cloudmine");
let rest = require("restler");

let ws = new cm.WebService({
  "appid":"993ef8942865413b92619b6a31d6c94b",
  "apikey":"3369b2c327c74a6986d97434142e8648"
});

module.exports = function(req,reply){

	let input = req.payload.request.body;
	let device = input.source;
	let _count = input.count;

	ws.get('').on('success', function(data, res){

		  let fitbit_appid = data.route_definitions.fitbit.appid;
  		let fitbit_apikey = data.route_definitions.fitbit.apikey;
  		let nokia_appid = data.route_definitions.nokia.appid;
  		let nokia_apikey = data.route_definitions.nokia.apikey;

  		switch(device) {
  
    case "fitbit":

      let fitbitHeaders = {"X-CloudMine-Apikey":fitbit_apikey};

      if (_count == "true") {

      rest.get('https://api.cloudmine.io/v1/app/' + fitbit_appid + '/account?count=true',
    {headers:fitbitHeaders}).on('complete', function(users, res){
      let val = users.count;
      let msg = {"Application ID":fitbit_appid, "User Count on App":val};
      reply(msg);
      });

      } else {

      rest.get('https://api.cloudmine.io/v1/app/' + fitbit_appid + '/account',
    {headers:fitbitHeaders}).on('complete', function(users, res){
      reply(users);
      });
      }
        break;

    case "nokia":

       let nokiaHeaders = {"X-CloudMine-Apikey":nokia_apikey};

    	if (_count == "true") {

    	rest.get('https://api.cloudmine.io/v1/app/' + nokia_appid + '/account?count=true',
		{headers:nokiaHeaders}).on('complete', function(users, res){
			let val = users.count;
			let msg = {"Application ID":nokia_appid, "User Count on App":val};
			reply(msg);
			});

    	} else {

    	rest.get('https://api.cloudmine.io/v1/app/' + nokia_appid + '/account',
		{headers:nokiaHeaders}).on('complete', function(users, res){
			reply(users);
			});
    	}
        break;

    default:
        reply({"error":"device not found"});
	 }

	});
};