/*	VCO.Media.Vimeo
================================================== */

VCO.Media.Vimeo = VCO.Media.extend({
	
	includes: [VCO.Events],
	
	/*	Load the media
	================================================== */
	_loadMedia: function() {
		var api_url,
			self = this;
		
		// Loading Message
		this.message.updateMessage(VCO.Language.messages.loading + " " + this.options.media_name);
		
		// Create Dom element
		this._el.content_item	= VCO.Dom.create("div", "vco-media-item vco-media-iframe vco-media-vimeo vco-media-shadow", this._el.content);
		
		// Get Media ID
		this.media_id = this.data.url.split(/video\/|\/\/vimeo\.com\//)[1].split(/[?&]/)[0];
		
		// API URL
		api_url = "http://player.vimeo.com/video/" + this.media_id + "?api=1&title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff";
		
		/*
		// Player ID
		this.player = VCO.Util.unique_ID(6, "vco-vimeo");
		
		// API URL
		api_url = "http://player.vimeo.com/video/" + this.media_id + "?api=1&player_id=" + this.player + "&title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff";
		
		// API Call
		// API Call
		//this.player = VCO.Util.unique_ID(6, "vco-vimeo");
		this._el.content_item.innerHTML = "<iframe autostart='false' id='" + this.player + "' frameborder='0' width='100%' height='100%' src='" + api_url + "'></iframe>";
		
		VCO.Load.js('http://a.vimeocdn.com/js/froogaloop2.min.js', function() {
			trace("Vimeo API Library Loaded");
			self.onLoaded();
			$f(self.player).api('play');
		});
		*/
		
		
		this.player = VCO.Dom.create("iframe", "", this._el.content_item);
		this.player.width 		= "100%";
		this.player.height 		= "100%";
		this.player.frameBorder = "0";
		this.player.src 		= api_url;
		
		//this.player = VCO.Util.unique_ID(6, "vco-vimeo");
		//this._el.content_item.innerHTML = "<iframe autostart='false' frameborder='0' width='100%' height='100%' src='" + api_url + "'></iframe>"		
		
		
		// After Loaded
		this.onLoaded();
	},
	
	// Update Media Display
	_updateMediaDisplay: function() {
		this._el.content_item.style.height = VCO.Util.ratio.r16_9({w:this._el.content_item.offsetWidth}) + "px";
		
	},
	
	_stopMedia: function() {
		//trace(this.player.contentWindow);
		//trace(this.player);
		//$f(this.player).api('pause');
		
		try {
			this.player.contentWindow.postMessage(JSON.stringify({method: "pause"}), "http://player.vimeo.com");
		}
		catch(err) {
			trace(err);
		}
		/*
		this._el.content_item.postMessage({
			"method": "pause",
			"value": ""
		});
		*/
	}
	
});
