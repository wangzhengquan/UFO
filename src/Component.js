/**
 * config{
 * 		tpl,
 * 		listeners:{
 * 			afterrender
 * 		}
 * }
 */
KISSY.add(function(S, Node, EventSupport, ComponentQuery){
	var tpl = "<div></div>";
	
	function Component(config){
		//this.rootContainer = $('section');
		this.config = config || {} ;
		S.mix(this, config, true, undefined, true);
		this.id = S.guid();
		if(this.tplId){
			tpl = this.tpl = S.one("#"+this.tplId).html();
		}
		Component.superclass.constructor.call(this, config);
		
		this.initComponent();
	}
	
	S.extend(Component, EventSupport);
	
	UFO.augment(Component, {
		
		alias: 'component',
		
		initComponent: function(){
			var me = this;
			if(!this.el){
				tpl = this.tpl || tpl;
				this.el = S.all(tpl);
			}
			
		 
			this.bodyStyle=S.mix(this.bodyStyle || {}, {
				padding: this.bodyPadding
			}, true);
			this.getBodyContainer().css(this.bodyStyle);
			
			 
			this.style=S.mix(this.style || {}, {
				padding: this.padding,
				margin: this.margin
			});
			this.el.css(this.style);
			
			this.cls &&  this.addClass(this.cls);
			this.bodyCls &&  this.getBodyContainer().addClass(this.bodyCls);
			this.attributes && this.el.attr(this.attributes);
			//this.setSize(this.width, this.height);
			
			this.addCmpEvents();
			
		},
		
		setSize: function(width, height){
			this.el.width(width);
			this.el.height(height);
			 
		},
		
		toEl: function(){
			return this.el;
		},
		
		getEl:function(){
			return this.toEl();
		},
		
    getTargetEl : function() {
         
    },
	    
	    /*
	     * 添加子元素的位置
	     */
		getBodyContainer: function(){
			return this.el;
		},
		
		getContentTarget: function(){
			return this.el;
		},
		
		render: function(o){
			if(typeof o == "string"){
				o = S.one("#"+o);
				if(!o){
					o= S.one(o);
				}
			}
			o.append(this.toEl());
			this.fire('afterrender', this);
		},
		 
		onAdded : function(container, pos) {
        var me = this;
        me.ownerCt = container;
        me.fireEvent('added', me, container, pos);
	  },
	    
		css: function(name, value){
			var args = Array.prototype.slice.call(arguments, 0);
			if(args.length === 1 && S.isString(args[0])){
				 el.css(name);
			} else {
				this.el.css(name, value);
			}
			
			return this;
			
		},
		removeClass: function(cls){
			this.el.removeClass(cls);
			return this;
		},
		addClass: function(cls){
			this.el.addClass(cls);
			return this;
		},
		
		hasClass: function(cls){
			return this.el.hasClass(cls);
		},
		
		hasCls: function(cls){
			return this.hasClass(cls);
		},
		
		setDisabled: function(disabled){
			this.disabled = disabled;
			if(disabled){
				this.el.attr('disabled', 'disabled');
			}
			else{
				this.el.attr('disabled', '');
			}
		},
		
		show: function(){
			if(this.fire('beforeshow')!==false){
				this.el.show();
				this.fire('show');
			}
			
			return this;
		},
		
		hide: function(cb){
			var me = this;
			if(this.fire('beforehide')!==false){
				this.el.hide();
				if(me.destroy){
					me.el.remove();
					delete me;
				} 
				me.fire('hide');
				cb && cb();
			}
			
			
			return this;
		},
		
	 
		getRootContainer: function(){
			return this.rootContainer;
			 
		},
		
		 
		getId: function(){
			return this.id;
		},
		
		/**
		 * 向上搜索父元素
		 * @param selector
		 * @returns
		 */
		up: function(selector) {
      // Use bubble target to navigate upwards so that Components can implement their own hierarchy.
      // For example Menus implement getBubbleTarget because they have a parentMenu or ownerButton as an
      // upward link depending upon how they are owned and triggered.
			var result = this.getBubbleTarget();
      if (selector) {
          for (; result; result = result.getBubbleTarget()) {
              if (ComponentQuery.is(result, selector)) {
                  return result;
              }
          }
      }
      return result;
    },
    
    getBubbleTarget: function(){
    	return this.ownerCt;
    },
	 
		addCmpEvents: function(){},
		
		set: function(p, v){
			this[p] = v;
		},
		
		get: function(p){
			return this[p];
		},
		
		/**
		 * 是否为某一类型的元素
		 * compoent.isType('component') = true
		 * compoent.isType('container') = true
		 */
		isType:function(type){
			return UFO.isType(this, type);
			
		}
	});
	
	return Component;
}, {
	requires: ['node', './EventSupport', './ComponentQuery']
});