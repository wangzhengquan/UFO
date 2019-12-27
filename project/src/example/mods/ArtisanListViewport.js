KISSY.add(function(S, Node, Viewport, List){
	 
	function ListViewport(config){
		 
		ListViewport.superclass.constructor.call(this, config);
		
	}
	//继承自Viewport
	S.extend(ListViewport, Viewport);
	
	S.augment(ListViewport, {
		
		initComponent: function(){
			
			//
			/*var list = new List();
			this.items = [list];
			*/
			//还可以用下面的方式创建
			this.items = [{
				type: 'artisanlist'//artisanlist就是在ArtisanList里定义的alias(别名)
			}];
			
			
			this.title = "手艺人列表";
			
			//上面的代码要在这句话的前面加
			ListViewport.superclass.initComponent.apply(this, arguments);
			
			//还可以
			//向下搜索子元素
			/*var artisanList = this.down('artisanlist');
			console.log('artisanlist', artisanList);*/
			
			//向上搜索父元素
			/*var list_viewport = list.up('container');
			console.log('listViewport', list_viewport);*/
		},
		
		/**
		 * 事件绑定
		 */
		addCmpEvents: function(){
			ListViewport.superclass.addCmpEvents.apply(this, arguments);
		}
	 
	});
	
	return ListViewport;
}, {
	requires: ['node', "../../viewport/mods/Frame", "./ArtisanList"]
});