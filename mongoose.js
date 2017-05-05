
var mongoose = require('mongoose');

mongoose.Promise = global.Promise; //set mongoose promise to the globle promise variable found in ES6

var Schema = mongoose.Schema;

//mongoose.connect('mongodb://localhost:27017/urlShortener'); 
var url = process.env.MONGOLAB_URI;
//var url = 'mongodb://localhost:27017/urlShortener';
/*mongoose.connect(url, function (err, db) {
	if(err) {
		console.log('Unable to connect to the mongoDB server. Error:', err)
	} else {
		console.log('Connection established to', url);
	}
}); */
mongoose.connect(url, function(err) {
	if(err) {
		console.log(err);
	} else {
		console.log ('mongoose connection is successful on: ' + 'mongolab');
	}
});


var urlSchema = new Schema({ //create schema
	original: { type: String, required: true },
	shortCode: { type: String, required: true }
});

const UrlEntry = mongoose.model('UrlEntry', urlSchema) //create a model

//exports.UrlEntry = UrlEntry;


module.exports = UrlEntry;

