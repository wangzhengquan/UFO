KISSY.add(function(S, Node, XTemplate, Container, ProductList){
	 
	function RecommendProductTab(config){
		RecommendProductTab.superclass.constructor.call(this, config);
	}
	
	S.extend(RecommendProductTab, Container);
	
	UFO.augment(RecommendProductTab, {
		alias: 'recommendProductTab',
		initComponent: function(){
			this.items = [{
				type: 'productlist'
			}];
			
			this.navBar = {
    		  title: '最新活动',
    		  barCls : 'bar-black'
       		};
			RecommendProductTab.superclass.initComponent.apply(this, arguments);
		},
		 
		addCmpEvents: function(){
			RecommendProductTab.superclass.addCmpEvents.apply(this, arguments);
		}
	 
	});
	
	return RecommendProductTab;
}, {
	requires: ['node', "xtemplate",  "UFO/container/Container" , "../../product/mods/List"]
});