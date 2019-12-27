KISSY.add(function(S, Node, XTemplate, Component, tpl){
	
	
	/**
	 * config{
	 *    icon
	 *    iconCls
	 *    iconAlign
	 *    text
	 *    handler;
	 * }
	 */
	function Button(config){
		S.mix(config, {
			tooltip:''
		}, false);
		Button.superclass.constructor.apply(this, arguments);
	}
	
	S.extend(Button, Component);
	
	UFO.augment(Button, {
		alias: 'button',
		
		initComponent : function(){
			var me = this;
			tpl = this.tpl || tpl;
			this.el = S.one( new XTemplate(tpl).render(this.config)); 
			this.iconEl = this.el.one('.icon');
			this.textEl = this.el.one('[name=text]');
			if(this.disabled){
				this.setDisabled(this.disabled);
			}
			
			if(this.iconStyle){
				this.setIconStyle(this.iconStyle);
			}
			
			this.relayEvents(this.el, ['keydown']);
			Button.superclass.initComponent.apply(this, arguments);
		},
		
		setIconStyle: function(iconStyle){
			this.iconEl.css(iconStyle);
		},
		
		setDisabled: function(disabled){
			this.disabled = disabled;
			if(disabled){
				this.el.attr('disabled', 'disabled');
				this.el.addClass('button-disabled');
			}else{
				this.el.removeAttr('disabled');
				this.el.removeClass('button-disabled');
			}
		},
		setText: function(text){
			this.textEl.html(text);
		},
		isDisabled: function(){
			return this.el.attr('disabled')=='disabled';
		},
		addCmpEvents: function(){
			var me = this;
			this.el.on('mouseenter', function(e){
				if(!me.isDisabled()){
					me.el.addClass('hover');
				}
			});
			this.el.on('mouseover', function(e){
				if(!me.isDisabled()){
					me.el.addClass('hover');
				}
			});
			this.el.on('mouseout', function(e){
				if(!me.isDisabled()){
					me.el.removeClass('hover');
				}
			});
			
			this.el.on('mousedown', function(e){
				if(!me.isDisabled()){
					me.el.addClass('active');
				}
				return false;
			});
			this.el.on('mouseup', function(e){
				if(!me.isDisabled()){
					me.el.removeClass('active');
				}
				return false;
			});
			this.el.on('tap', function(e){
				//me.el.attr('disabled', 'disabled');
				var propagation1 = true,
				 	propagation2 = true;
				
				me.handler && (propagation1 = me.handler(me, e));
				propagation2 = me.fire('click', me, e);
				//return false;
				//me.el.removeAttr('disabled');
				if(propagation1 === false || propagation2 === false){
					return false;
				}
			});
		}
	});
	 
	return Button;
}, {
	requires: ['node', 'xtemplate', '../Component', './tpl/button-tpl']
});