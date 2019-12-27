KISSY.add(function(S, Node, Frame, List){
	 
	function ListViewport(config){
		 
		ListViewport.superclass.constructor.call(this, config);
		
	}
	
	S.extend(ListViewport, Frame);
	
	S.augment(ListViewport, {
		
		initComponent: function(){
			var list = new List();
			this.items = [list];
			this.title = "活动列表";
			ListViewport.superclass.initComponent.apply(this, arguments);
		},
		
		addCmpEvents: function(){
			ListViewport.superclass.addCmpEvents.apply(this, arguments);
		}
	 
	});
	
	return ListViewport;
}, {
	requires: ['node', "../../viewport/mods/Frame", "./List"]
});