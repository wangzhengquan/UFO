KISSY.add(function(S){
	 
	function Layout(config){
		this.initLayout();	
	}
	//S.extend(Layout, Ufo.layout.Layout);
	UFO.augment(Layout, {
		alias: 'layout',
		initLayout : function(){
			this.el = [];
			//Layout.superclass.initLayout.apply(this, arguments);
		},
		
		doLayout: function(items){
			var me = this;
			this.clearItems();
			if(!S.isEmptyObject(items)){
				var item;
				for(var i=0, len= items.length; i<len; i++){
					item = items[i];
					if(item != undefined && item != null){
						me.el.push(item.getEl ? item.getEl() : item);
						item.fire && item.fire('afterrender', item);
					}
				}
				 
			}
		},
		clearItems: function(){
			this.el=[];
		},
		calculate: function(){
			
		},
		
		toEl: function(){
			return this.el;
		}
	});
	
	 return Layout;
});