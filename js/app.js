var app = (function() {
	var self = {};

	// initialize javascript SDK
	window.fbAsyncInit = function() {
		FB.init({
			appId: '397359713625902',
			channelUrl: '//localhost/facebook/channel.html',
			status: true,
			cookie: true,
			xfbml: true
		});
	};

	// load javascript SDK
	(function(d) {
		var js, id = 'facebook-jssdk';
		if (d.getElementById(id)) { return; }

		js = d.createElement('script');
		js.id = id;
		js.async = true;
		js.src = '//connect.facebook.net/en_US/all.js';
		d.getElementsByTagName('head')[0].appendChild(js);
	})(document);

	var client_id = config.get('client_id');
	var redirect_uri = window.location.href;
	var response_type = 'token';
	var scope = 'read_stream';
	var display = 'popup';

	if (window.location.hash.length == 0) {
		var url = 'https://www.facebook.com/dialog/oauth'
				+ '?client_id=' + client_id
				+ '&redirect_uri=' + redirect_uri
				+ '&response_type=' + response_type
				+ '&scope=' + scope
				+ '&display=' + display
				;
		window.location.href = url;
	} else {
		if (window.location.search.length == 0) {
			access_token = window.location.hash.split('&')[0].substring(14);
		} else {
			//show "error", "error_reason", "error_description"
			alert(window.location.search.substring(1));
		}
	}

	self.getWall = function () {
		FB.api(
			'/me/feed',
			{
				access_token: access_token,
				limit: 100
			},
			function(response) {
				var contents = [];
				for (var i = 0; i < response.data.length; i++) {
					var data = response.data[i];
					var id = data.from.id;

					if (data.type !== 'status') { continue; }
					// skip my message
					if (id == '100000624448382') { continue; }

					var d = {
						'id': id,
						'name': data.from.name,
						'message': data.message,
						'icon': 'https://graph.facebook.com/' + id + '/picture?type=square'
					};

					contents.push(d);
				}

				//paging
				//var next = response.paging.next;

				// create html
				var source = $("#entry-template").html();
				var template = Handlebars.compile(source);
				var data = {
					'data': contents
				};
				var html = template(data);
				$('.contents').append(html);
			}
		);
	}

	return self;
})();
