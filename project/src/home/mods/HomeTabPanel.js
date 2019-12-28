KISSY.add(function(S, Node, Event, XTemplate,TabPanel, CategoryTab,UFO, homecss){
	
	
	function HomeTabPanel(config){
		HomeTabPanel.superclass.constructor.call(this, config);
	}
	
	S.extend(HomeTabPanel, TabPanel);
	
	UFO.augment(HomeTabPanel, {
		alias: 'hometabpanel',
		
		initComponent: function(){
			this.tabNavCls = 'tabs-stable';
			
			this.items = [
              
          	  {
        	    title:'推荐',
        	    iconCls: 'ion-home',
        	    //iconInCls: 'ion-home',
        	    name: 'recommend_product',
        	  	type: "recommendProductTab"
        	  	
        	  },{
        	    title:'专栏',
        	    iconCls: 'ion-ios-list',
        	    //iconInCls: 'ion-home',
        	    name: 'topic_tab',
        	  	type: "topictab",
        	  	//懒加载路径
        	  	path: 'app/home/mods/TopicTab'
        	  },{
          	    title:'类目',
          	    iconCls: 'ion-ios-grid-view',
          	    //iconInCls: 'ion-home',
          	    name: 'category',
          	    type: 'categorytab',
          	  	path: "app/home/mods/CategoryTab"
          	  }
          	
            ];
			HomeTabPanel.superclass.initComponent.apply(this, arguments);
		},
		
		addCmpEvents: function(){
			var me = this;
			HomeTabPanel.superclass.addCmpEvents.apply(this, arguments);
			 
			 
		}
	});
	
	return HomeTabPanel;
}, {
	requires: [
	   "node", "event", "xtemplate",
	   "UFO/tab/TabPanel",	   
	   "./ProductListTab",
	   "UFO/UFO",
	   //css也可以动态引入
	   "css/home.css"	   	    
	]
});
