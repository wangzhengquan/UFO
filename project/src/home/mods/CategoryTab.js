KISSY.add(function(S, Node, XTemplate, Container, CategoryList){
	 
	function CategoryTab(config){
		CategoryTab.superclass.constructor.call(this, config);
	}
	
	S.extend(CategoryTab, Container);
	
	UFO.augment(CategoryTab, {
		alias: 'categorytab',
		initComponent: function(){
			this.items = [{
				type: 'categorylist'
			}];
			
			this.navBar = {
    		  title: '首页',
    		  barCls : 'bar-black'
       		};
			CategoryTab.superclass.initComponent.apply(this, arguments);
		},
		 
		addCmpEvents: function(){
			CategoryTab.superclass.addCmpEvents.apply(this, arguments);
		}
	 
	});
	
	return CategoryTab;
}, {
	requires: ['node', "xtemplate",  "UFO/container/Container" , "../../category/mods/CategoryList"]
});