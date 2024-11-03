KISSY.add(function(S, Node, XTemplate, Component, Layout, ComponentQuery){
	var tpl = "<div></div>";
	function Container(config){
		Container.superclass.constructor.call(this, config);
	}
	
	S.extend(Container, Component);
	
	UFO.augment(Container, {
		alias:'container',
		initComponent: function(){
			if(!this.el){
				tpl = this.tpl || tpl;
				this.el = S.all(tpl);
			}
			var layout = this.layout;
			if(!layout){
				layout = 'layout';
			}
			this.setLayout(layout);
			
			this.initItems();
			
			Container.superclass.initComponent.apply(this, arguments);
		},
		updateLayout: function(){
			//console.log('this.getBodyContainer()', this.el);
			this.layout.doLayout(this.items);
			this.getBodyContainer().html('');
	
			var els = this.layout.toEl(),
				el;
			if(!S.isArray(els)){
				els = [els];
			}
			for(var i=0, len =  els.length; i<len; i++){
				 el =  els[i];
				// console.log(el);
				 this.getBodyContainer().append(el);
			}
			
		},
		initItems: function(){
			if(this.items){
				var items = this.items;
				
				if (!S.isArray(items)) {
					items = [items];
	      }
				this.items = [];
				
				this.add(items);
			}
		},
		add: function(items, pos){
			//console.log(items);
			if(!S.isArray(items)){
				items = [items];
			}
			var me = this,
				cmp;
			me.items = me.items || [];
			if(!S.isEmptyObject(items)){
				var item;
				for(var i=0, len= items.length; i<len; i++){
					item = items[i];
					cmp = UFO.createItem(item, me.defaults);
					me.items.push(cmp);
					cmp && cmp.onAdded && cmp.onAdded(me, i);
					me.fireEvent('add', me, cmp, i);
				}
			}
			if(!S.isEmptyObject(this.items)){
				this.updateLayout();
			}
			return me.items;
		},
		setLayout: function(layout){
			this.layout = UFO.create(layout);
			 
		},
		/**
		 * 以递归的方式获取子元素
		 * @param deep
		 * @returns {Array}
		 */
		getRefItems : function(deep) {
			 
	        var me = this,
	            items = me.items,
	            len = items.length,
	            i = 0,
	            item,
	            result = [];

	        for (; i < len; i++) {
	            item = items[i];
	            result.push(item);
	            if (deep && item && item.getRefItems) {
	                result.push.apply(result, item.getRefItems(true));
	            }
	        }

	        // Append floating items to the list.
	        if (me.floatingItems) {
	            result.push.apply(result, me.floatingItems);
	        }

	        return result;
	    },
		 /**
	     * Retrieves all descendant components which match the passed selector.
	     * Executes an UFO.ComponentQuery.query using this container as its root.
	     * @param {String} [selector] Selector complying to an UFO.ComponentQuery selector.
	     * If no selector is specified all items will be returned.
	     * @return {UFO.Component[]} Components which matched the selector
	     */
	    query : function(selector) {
	        selector = selector || '*';
	        return ComponentQuery.query(selector, this);
	    },
	    /**
	     * Retrieves the first descendant of this container which matches the passed selector.
	     * The passed in selector must comply with an Ext.ComponentQuery selector.
	     * @param {String} [selector] An Ext.ComponentQuery selector. If no selector is
	     * specified, the first child will be returned.
	     * @return Ext.Component
	     */
	    down : function(selector) {
	        return this.query(selector)[0] || null;
	    }
	 
	});
	
	return Container;
}, {
	requires: ['node', "xtemplate",  "../Component" ,"../layout/Layout", "../ComponentQuery"]
});