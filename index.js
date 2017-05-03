var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var mongoose = require('mongoose'); 

var bodyParser = require('body-parser');

var mongoo = require('./mongoose.js'); 
var url = require('./url.js');

app.set('view engine', 'ejs');//set EJS to the view engine & res.render will look in the views folder for the ejs file to render res.render('profile') will look for the folder called profile

var mongoFunctions = require('./dbSchemaFun.js');


app.get('/users', function(req, res) { //gets the list of urls added to db on that mongoose connection
	mongoose.model('UrlEntry').find({}, function(err, UrlEntry) {
		 if (err) {
		 	next(err);
		 }
		 res.status(200).json(UrlEntry);
	})		
})




function shortRoute(req, res) {
	var short = req.params.shortie //look at where app.get is invoked on /:shortie route
	mongoFunctions.shortLookup(short).then(exists => {
		if(exists) {
			var org = exists.original;
			var shrt = exists.shortCode;
			var data = {original: org, shortCode: shrt}
			res.render('shortRoute', {data: data});
		} else {
			res.json({"error":"this is not a valid short code"})
		}
	}).catch((err) => {
		  	console.log('errored');
		  }); 
}

function urlRoute(req, res) {
	var input = req.params[0];
	var link = req.params[0].link;
	var isAUrl = url.checkUrl(input);
	var short = url.getShortCode();
	/*
	if(mongoFunctions.isDuplicateShort(short)) { //if shortCode generated is a duplicate, generate new short code
		short = url.getShortCode();
	}
	*/
	if(isAUrl) {
		mongoFunctions.urlExists(input).then(exists => {
			if (exists) {
				console.log('returned old short code');
				//res.json({original: input, shortCode: exists});
				var data = {original: input, shortCode: exists};
				res.render('urlRoute', {data: data});
			} 
			else {
				console.log('saved new entry');
				mongoFunctions.insertEntry(input, short);
				//res.json({original: input, shortCode: short});
				var data = {original: input, shortCode: exists};
				res.render('urlRoute', {data: data});
			}


			/*else {
				mongoFunctions.insertEntry(input, short).then(inserted => {
					console.log(inserted);
					console.log('inserted entry');
					//res.json({original: inserted.original, shortCode: inserted.shortCode})
					res.json({original: input, shortCode: short});
				})
				.catch((err) => {
		  	console.log('errored');
		  }); 
			} */
		}).catch((err) => {
		  	console.log('errored');
		  }); 
	}
	

	//need to refactor bottom two statements to be the 'else' then based on if url exists either save the entry or look up the old entry
	
	else { //check if valid url
		res.json({"error":"this is not a valid url"});
	} 

}
/*
function urlRoute(req, res) {
	//console.log(req.params[0]);

	var input = req.params[0];
	var isAUrl = url.checkUrl(input);

	
	const short = url.getShortCode();

	//console.log(mongoFunctions.urlExists(input))

	
	if(!isAUrl) { //check if valid url
		res.json({"error":"this is not a valid url"});
	} 
	else if(mongoFunctions.isDuplicateShort(short)===true){ //check to make sure getShortCode generated unique link
		res.send("refresh page for unique url"); 
	} 

	//need to refactor bottom two statements to be the 'else' then based on if url exists either save the entry or look up the old entry
	
	else if(mongoFunctions.urlExists(input)){ //check if the given url already has a short code
		
		console.log('you got me to run');

		var oldShort = mongoFunctions.urlExists(input);
		console.log(oldShort);
		res.json({original: input, shortCode: oldShort});
	} 
	
	else {
		
		
		console.log('you inserted entry')
		//var response = 
		mongoFunctions.insertEntry(input, short);
		//console.log(response);
		return res.json({original: input, shortCode: short});
		
		/*
		return mongoFunctions.insertEntry(input, short).then(inserted => {
			console.log(inserted)
			res.send('wtf')
		}).catch((err) => {
		  	console.log('errored');
		  }); 
		   
	}

}
*/

app.listen(port, function() {
	console.log('Example app listening on port ' + port);
})

app.get('/:shortie', shortRoute);
app.get('/new/*', urlRoute);
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html')
	//res.send('Welcome to the URL shortener')
})

module.exports = app;
