


module.exports = {
	checkUrl: function(arg) {
		var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
		var regex = new RegExp(expression);

		if(arg.match(regex)) {
			return true;
		}
	},
	getShortCode: function() {
		var shortCode = [];
		var alpha = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; //string of length 62
		var position = 0;
		for (var i=0; i<6; i++){ //generate 6 char long string to serve as shortCode
			position = Math.floor(Math.random()*(63)) //generate number between 1 and 62
			shortCode[i] =  alpha.charAt(position);
		}
		return shortCode.join('');
	}
}
