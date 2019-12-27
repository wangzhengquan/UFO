KISSY.add(function(S, Node, XTemplate, Container, TopicList){
	 
	function RecommendProductTab(config){
		RecommendProductTab.superclass.constructor.call(this, config);
	}
	
	S.extend(RecommendProductTab, Container);
	
	UFO.augment(RecommendProductTab, {
		alias: 'topictab',
		initComponent: function(){
			this.items = [{
				type: 'topiclist'
			}];
			
			this.navBar = {
    		  title: '热门专栏',
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
	requires: ['node', "xtemplate",  "UFO/container/Container" , "../../topic/mods/TopicList"]
});