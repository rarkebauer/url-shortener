var mongoose = require('mongoose');
var index = require('./index.js');

var UrlEntry = require('./mongoose.js');
var urljs = require('./url.js')


module.exports = {
	/*getShortened: function() {
		return mongoo.UrlEntry
		  .find() //find everything
		  .sort({ shortened: -1}) //sort in descending order of shortened
		  .limit(1) //return the first/highest number
		  .select({_id: 0, shortened: 1}) //only return shortened field
		  .then(docs => { 
		  	//if a document is found, return its shortened url plus one otherwise it's the first entry and the shortened url is zero
		  	return docs.length === 1 ? docs[0].shortened + 1 : 0;
		  }).catch((err) => {
			console.log('errored');
		});
	}, */
	/*urlExists: function(inp) {
		//return mongoo.UrlEntry
		return UrlEntry
		.find({ original: inp }) //check if doc exists with that orignal url 
		.then(doc => {
			console.log('got here')
			console.log(doc[0].shortCode)
			return doc ? doc[0].shortCode : false
			}) //return the shortcode for that entry or return false
		.catch((err) => {
			console.log('errored');
		});
	}, */
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
	},
	
	returnDocs: function() {
		
		//return mongoo.UrlEntry
		return UrlEntry
		  .find()
		  .sort({ shortCode: -1 })
		  .then(docs => {
		  	return docs
		  }).catch((err) => {
		  	console.log('errored');
		  })
	},
	index: (req, res, next) => {
		UrlEntry.find({}, (error, users) => {
			console.error(error('err', err))
			console.log('found users', users)
		})
	}

	
}

