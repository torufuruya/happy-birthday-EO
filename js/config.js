var config = (function() {
	var self = {};
	var config = {
		'client_id' : 'xxxxxxxxxx',  //enter valid client id
	};

	self.get = function (name) {
		return config[name] ? config[name] : '';
	}

	return self;
})();
