var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

var url = require('./url.js');

function urlRoute(req, res) {
	var isAUrl = url.checkUrl(req.params[0]);
	res.json(isAUrl);
}

app.listen(port, function() {
	console.log('Example app listening on port ' + 3000);
})

app.get('/new/*', urlRoute);
app.get('/', function(req, res) {
	res.send('Welcome to the URL shortener')
})

module.exports = app;
