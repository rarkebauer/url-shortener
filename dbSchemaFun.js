var mongoose = require('mongoose');
var index = require('./index.js');

var UrlEntry = require('./mongoose.js');
var urljs = require('./url.js')


module.exports = {
	
	shortLookup: function(sht) {
		return UrlEntry
		.find({shortCode: sht})
		.then(doc => {
			return doc ? doc[0] : false
		})
		.catch((err) => {
			console.log('shortcode lookup went wrong')
		})
	},
	urlExists: function(inp) {
		return UrlEntry
		.find({ original: inp }) //check if doc exists with that orignal url 
		.then(doc => {
			return doc ? doc[0].shortCode : false 
			})  //return the shortcode for that entry or return false
		.catch((err) => {
			console.log('url exists rejected');
		});
	},

	isDuplicateShort: function(sht) {
		return UrlEntry
		  .find({ shortCode: sht })
		  .then(doc => {
		  	return doc ? true : false 
		  }) //if doc with generated short code exists return true otherwise return false
		  .catch((err) => {
		  	console.log('errored');
		  });
		//console.log(doc.shortened)
	},

	insertEntry: function(url, sht) {
			let entry = new UrlEntry({ original: url, shortCode: sht });
			console.log(entry);
			entry.save(); 

			/*return urljs.getShortCode().then(newCode => {
				let entry = new UrlEntry({ original: url, shortCode: newCode });
				console.log(entry);
				return entry.save();
			}).catch((err) => {
				console.log('errored');
			}); */
	}
	
}

