KISSY.add(function(S, Node, XTemplate, Container, tpl){
	 
	function Viewport(config){
		 
		Viewport.superclass.constructor.call(this, config);
		
	}
	
	S.extend(Viewport, Container);
	
	S.augment(Viewport, {
		
		initComponent: function(){
			var config = this.config = this.config || {};
			S.mix(config, {
				title: this.title,
				leftButtons: this.leftButtons,
				rightButtons: this.rightButtons
			}, false);
			this.el = S.one(new XTemplate(tpl).render(config));
			this.content = this.el.one('.content');
			Viewport.superclass.initComponent.apply(this, arguments);
		},
		getBodyContainer: function(){
			 return this.content;
		},
		addCmpEvents: function(){
			Viewport.superclass.addCmpEvents.apply(this, arguments);
		}
	 
	});
	
	return Viewport;
}, {
	requires: ['node', "xtemplate",  "UFO/container/Container" , "../tpl/main-tpl"]
});
