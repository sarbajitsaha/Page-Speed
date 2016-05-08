var urlExists = require('url-exists');
var bodyParser = require('body-parser');
var loadtest = require('loadtest');

module.exports = function(app){

	app.use(bodyParser.json()); // support json encoded bodies
	app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

    app.post('/', function(req, res){
    	var url = req.body.weburl;
    	var prefix1 = 'http://';
    	var prefix2 = 'https://';
		if ((url.substr(0, prefix1.length) !== prefix1) && (url.substr(0, prefix2.length) !== prefix2) )
		{
    		url = prefix1 + url;
		}


		urlExists(url, function(err, exists) {
  			if(!exists)
  				res.send("not_valid");
  			else
  			{
  				var options = {
	    			url: url,
	                concurrency: 5,
	    			maxRequests: 10,
	    			maxSeconds: 30
				};
				loadtest.loadTest(options, function(error, result)
				{
				    if (error)
				    {
				    	var data={};
				    	data.title = "error";
				    	data.msg = error;
				    	res.send(JSON.stringify(data));	
				        return console.error('Got an error: %s', error);
				    }
				    else
				    {
				    	var data={};
				    	data.title = "success";
				    	data.msg = result;
				    	//console.log('Tests run successfully');
				    	console.log(data);
				    	res.send(JSON.stringify(data));	
				    }
				});
  			}
		});
    });

}