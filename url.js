
module.exports = {
	checkUrl: function(arg) {
		var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
		var regex = new RegExp(expression);

		if(arg.match(regex)) {
			return "this IS a valid url"
		}
		return {"error":"this is not a valid url"};
	}
}