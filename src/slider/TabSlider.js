KISSY.add(function(S, Node, Event, XTemplate, Slider,tpl){
	var body = document.body;
 
	
	function TabSlider(config){
		 
		TabSlider.superclass.constructor.call(this, config);
	}
	
	S.extend(TabSlider, Slider);
	
	UFO.augment(TabSlider, {
		alias: 'tabslider',
		
		initComponent: function(){
			this.el = S.all(tpl);
			this.el.one('.tabbar .tab-link-highlight').css('width',1/this.items.length*100+"%");
			TabSlider.superclass.initComponent.apply(this, arguments);
		},
		
		getSliderPagination: function(){
			return  this.el.one('.tabbar .tabbar-inner');
		},
		createSliderPaginationBullet: function(item, realIndex){
			return S.substitute('<a href="javascript:;" class="tab">{title}</a>',{title: item.title});
		},
		/**
		 * @override
		 */
		hightlightPagerBullet: function(index){
			var index = index,
				x = 100*index + "%";
			this.el.all('.tabbar-inner .tab').removeClass(this.activeCls);
			this.el.one('.tabbar-inner .tab:nth-child('+(index+1)+')').addClass(this.activeCls);
			this.el.one('.tabbar .tab-link-highlight').css({
				'transform': 'translate3d('+x+', 0px, 0px)',
				'-webkit-transform': 'translate3d('+x+', 0px, 0px)'
			});
		 
		}
	 
	});
	
	return TabSlider;
}, {
	requires: ["node", "event", "xtemplate",  "./Slider", "./tpl/tab-slider-tpl" ]
});