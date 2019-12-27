KISSY.add(function(S, Node, XTemplate, Slider){
	 
	function ImageSlider(config){
		
		config = S.mix(config || {}, {
			cls: 'photo-browser',
			slideCls : 'photo-browser-slide',
			activeCls: 'active'
		}, false);
		ImageSlider.superclass.constructor.call(this, config);
		
	}
	
	S.extend(ImageSlider, Slider);
	
	UFO.augment(ImageSlider, {
		alias: 'photobrowser',
		initComponent: function(){
		 
			var items = [];
			for(var i=0; i < this.data.length; i++){
				var o = this.data[i];
				items.push('<a href="'+(o.href ? o.href : "javascript:;")+'" class="photo-browser-zoom-container"><img src="'+o.url+'"></a>');
			}
			this.items = items;
			ImageSlider.superclass.initComponent.apply(this, arguments);
		}
	 
	});
	
	return ImageSlider;
}, {
	requires: ['node', "xtemplate",  "./Slider" ]
});