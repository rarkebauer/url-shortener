
var mongoose = require('mongoose');

mongoose.Promise = global.Promise; //set mongoose promise to the globle promise variable found in ES6

var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/urlShortener'); 


var urlSchema = new Schema({ //create schema
	original: { type: String, required: true },
	shortCode: { type: String, required: true }
});

const UrlEntry = mongoose.model('UrlEntry', urlSchema) //create a model

//exports.UrlEntry = UrlEntry;

module.exports = UrlEntry;